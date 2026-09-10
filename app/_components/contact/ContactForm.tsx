"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import type { UploadFile } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import AppInput from "@/app/_components/form/AppInput";
import AppTextArea from "@/app/_components/form/AppTextArea";
import AppSelect from "@/app/_components/form/AppSelect";
import AppUpload from "@/app/_components/form/AppUpload";

const PURPOSE_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "partner", label: "Become a Partner" },
  { value: "member", label: "Become a Member" },
  { value: "booking", label: "Booking Support" },
  { value: "media", label: "Media & Press" },
  { value: "other", label: "Other" },
];
const PURPOSE_VALUES = PURPOSE_OPTIONS.map((p) => p.value);

const contactSchema = z.object({
  purpose: z.string().min(1, "Select a purpose"),
  name: z.string().min(1, "Enter your name"),
  email: z.email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Enter a message"),
  attachments: z.custom<UploadFile[]>().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

/** Mocked contact form — no backend exists in this app yet, so submit just
 * shows an inline success state for ~2.5s, then resets. */
export default function ContactForm() {
  const searchParams = useSearchParams();
  const requestedPurpose = searchParams.get("purpose") ?? "";
  const initialPurpose = PURPOSE_VALUES.includes(requestedPurpose)
    ? requestedPurpose
    : "general";

  const [submitted, setSubmitted] = useState(false);
  const { control, handleSubmit, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      purpose: initialPurpose,
      name: "",
      email: "",
      phone: "",
      message: "",
      attachments: [],
    },
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const submit = useCallback(() => {
    setSubmitted(true);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setSubmitted(false);
      reset();
    }, 2500);
  }, [reset]);

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <FiCheckCircle size={40} className="text-green-600" />
        <p className="m-0 text-[14.5px] text-slate-700">
          Message sent — our team will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        void handleSubmit(submit)(e);
      }}
      noValidate
    >
      <div className="mb-4">
        <AppSelect
          name="purpose"
          control={control}
          label="Purpose"
          required
          options={PURPOSE_OPTIONS}
        />
      </div>
      <div className="mb-4">
        <AppInput name="name" control={control} label="Your name" required />
      </div>
      <div className="mb-4">
        <AppInput
          name="email"
          control={control}
          label="Email"
          required
          placeholder="you@example.com"
        />
      </div>
      <div className="mb-4">
        <AppInput name="phone" control={control} label="Phone (optional)" />
      </div>
      <div className="mb-4">
        <AppTextArea
          name="message"
          control={control}
          label="Message"
          required
          rows={5}
          placeholder="How can we help?"
        />
      </div>
      <div className="mb-6">
        <AppUpload
          name="attachments"
          control={control}
          label="Attachments (optional)"
        />
      </div>
      <Button
        type="primary"
        htmlType="submit"
        block
        className="h-auto! py-3.5! text-[15px]! font-sans"
      >
        Send message
      </Button>
    </form>
  );
}
