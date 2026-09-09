"use client";

import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { Button, DatePicker, Segmented, Tag } from "antd";
import { glass } from "@/app/_lib/glass";
import type { Doctor } from "@/app/_lib/doctor-data";

type ConsultType = "in-person" | "tele-consult";

interface BookingFormValues {
  consultType: ConsultType;
  date: Dayjs | null;
  timeSlot: string | null;
}

interface IProps {
  doctor: Doctor;
  onConfirm: () => void;
}

/** Sticky booking widget: consult-type + date + time-slot picker, mocked
 * confirm (no backend exists anywhere in this repo — see the spec's
 * Decision 5). */
export default function DoctorBookingPanel({ doctor, onConfirm }: IProps) {
  const consultOptions: { label: string; value: ConsultType }[] = [
    ...(doctor.inPersonAvailable
      ? [{ label: "In-Person", value: "in-person" as const }]
      : []),
    ...(doctor.teleConsultAvailable
      ? [{ label: "Tele-consult", value: "tele-consult" as const }]
      : []),
  ];

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [confirmed, setConfirmed] = useState<{
    date: string;
    time: string;
  } | null>(null);

  const { control, handleSubmit, watch, reset } = useForm<BookingFormValues>({
    defaultValues: {
      consultType: consultOptions[0]?.value ?? "in-person",
      date: null,
      timeSlot: null,
    },
  });

  const values = watch();
  const canConfirm =
    Boolean(values.date && values.timeSlot) && status === "idle";

  const onSubmit = (data: BookingFormValues) => {
    if (!data.date || !data.timeSlot) return;
    setStatus("loading");
    setConfirmed({
      date: data.date.format("ddd, MMM D, YYYY"),
      time: data.timeSlot,
    });
    setTimeout(() => {
      setStatus("success");
      onConfirm();
      setTimeout(() => {
        setStatus("idle");
        reset({ consultType: data.consultType, date: null, timeSlot: null });
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`flex flex-col gap-4.5 rounded-[20px] p-6 ${glass.subtle}`}>
      <div className="flex items-baseline justify-between">
        <h2 className="font-heading text-slate-900 font-bold text-[19px] m-0">
          Book a consultation
        </h2>
        <span className="font-heading text-slate-900 font-bold text-lg">
          NPR {doctor.consultFee.toLocaleString()}
        </span>
      </div>

      {status === "success" && confirmed ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-[13.5px] font-semibold text-green-800">
          Booking confirmed for {confirmed.date} at {confirmed.time}.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {consultOptions.length > 1 ? (
            <Controller
              name="consultType"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Segmented
                  block
                  options={consultOptions}
                  value={value}
                  onChange={onChange}
                  disabled={status === "loading"}
                />
              )}
            />
          ) : (
            <div className="text-[12.5px] font-semibold text-slate-500">
              {consultOptions[0]?.label} only
            </div>
          )}

          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select date"
                value={value}
                onChange={onChange}
                disabled={status === "loading"}
                disabledDate={(current) =>
                  !!current && current < dayjs().startOf("day")
                }
              />
            )}
          />

          <Controller
            name="timeSlot"
            control={control}
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-wrap gap-2">
                {doctor.timeSlots.map((slot) => (
                  <Tag.CheckableTag
                    key={slot}
                    checked={value === slot}
                    onChange={(checked) => onChange(checked ? slot : null)}
                    disabled={status === "loading"}
                    className={`rounded-full! border-[1.5px]! px-3.5! py-2! text-[12.5px]! font-semibold! ${
                      value === slot
                        ? "bg-primary! border-primary! text-white!"
                        : "border-slate-200! bg-white! text-slate-700!"
                    }`}
                  >
                    {slot}
                  </Tag.CheckableTag>
                ))}
              </div>
            )}
          />

          <Button
            type="primary"
            block
            htmlType="submit"
            disabled={!canConfirm}
            loading={status === "loading"}
            className="h-auto! py-3.5! text-[15px]! font-sans"
          >
            Confirm booking
          </Button>
        </form>
      )}
    </div>
  );
}
