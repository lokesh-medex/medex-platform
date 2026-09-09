"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Tag } from "antd";
import { FaStar } from "react-icons/fa";
import { FiCheck, FiMail, FiPhone } from "react-icons/fi";
import PageShell from "@/app/_components/shared/PageShell";
import Mesh from "@/app/_components/home/Mesh";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import ImageWithFallback from "@/app/_components/shared/ImageWithFallback";
import InitialsAvatar from "@/app/_components/shared/InitialsAvatar";
import { glass } from "@/app/_lib/glass";
import { LANGUAGES_DATA } from "@/app/_lib/homepage-data";
import type { Doctor } from "@/app/_lib/doctor-data";
import DoctorBookingPanel from "./DoctorBookingPanel";

interface IProps {
  doctor: Doctor;
}

function LanguageChip({ name }: { name: string }) {
  const flag = LANGUAGES_DATA.find((l) => l.name === name)?.flag;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-[12px] font-semibold text-slate-700">
      {flag && (
        <Image
          src={flag}
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 rounded-full object-cover"
        />
      )}
      {name}
    </span>
  );
}

export default function DoctorDetailPage({ doctor }: IProps) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <PageShell showCart cartCount={cartCount}>
      <div className="bg-[#F5F5F5]">
        <div className="relative overflow-hidden">
          <Mesh preset="detail" />
          <BackdropMotifs
            count={4}
            opacity={0.05}
            seed={91}
            zone="edges"
            minSize={100}
            maxSize={190}
          />
          <div className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-6 pb-2">
            <div
              className={`inline-flex w-fit max-w-full items-center gap-1.5 rounded-full px-4 py-2 text-[13px] text-slate-500 ${glass.subtle}`}
            >
              <Link href="/" className="text-slate-500 shrink-0">
                Home
              </Link>
              <span className="shrink-0">/</span>
              <Link
                href="/listings/doctors"
                className="text-slate-500 shrink-0"
              >
                Doctors
              </Link>
              <span className="shrink-0">/</span>
              <span className="text-slate-900 font-semibold truncate">
                {doctor.name}
              </span>
            </div>
          </div>
        </div>

        <section className="relative max-w-[1280px] mx-auto px-5 dt:px-8 pt-5 pb-14 grid grid-cols-1 dt:grid-cols-[1.5fr_1fr] gap-9 items-start">
          <BackdropMotifs
            count={5}
            opacity={0.04}
            seed={64}
            zone="edges"
            minSize={110}
            maxSize={210}
          />

          {/* LEFT: header, about, specializations */}
          <div>
            <div
              className={`flex flex-col gap-6 rounded-[20px] p-6 dt:flex-row ${glass.subtle}`}
            >
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/70">
                {doctor.photo ? (
                  <ImageWithFallback
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                    fallback={
                      <InitialsAvatar
                        name={doctor.name.replace("Dr. ", "")}
                        rounded="lg"
                        className="absolute inset-0 h-full! w-full! text-4xl!"
                      />
                    }
                  />
                ) : (
                  <InitialsAvatar
                    name={doctor.name.replace("Dr. ", "")}
                    rounded="lg"
                    className="absolute inset-0 h-full! w-full! text-4xl!"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-col gap-2.5">
                <Tag
                  variant="filled"
                  className="m-0! w-fit self-start! rounded-full! border-0! bg-primary-100! px-3! py-1.5! text-xs! font-bold! text-primary!"
                >
                  {doctor.specialty}
                </Tag>
                <h1 className="font-heading text-slate-900 font-bold text-2xl leading-[1.25] m-0">
                  {doctor.name}
                </h1>
                <div className="flex flex-wrap items-center gap-1.5">
                  <FaStar size={15} color="#f59e0b" />
                  <span className="text-[13.5px] font-bold text-slate-900">
                    {doctor.rating}
                  </span>
                  <span className="text-[13px] text-slate-400">
                    ({doctor.reviewCount} reviews)
                  </span>
                  <span className="text-slate-300">&middot;</span>
                  <span className="text-[13px] text-slate-500">
                    {doctor.yearsExperience} yrs experience
                  </span>
                  <span className="text-slate-300">&middot;</span>
                  <span className="text-[13px] text-slate-500">
                    {doctor.location}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {doctor.languages.map((lang) => (
                    <LanguageChip key={lang} name={lang} />
                  ))}
                </div>
              </div>
            </div>

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3">
                About
              </h2>
              <p className="text-slate-600 text-[14.5px] leading-[1.7] m-0">
                {doctor.bio}
              </p>
            </div>

            <div className={`mt-7 rounded-[20px] p-6 ${glass.subtle}`}>
              <h2 className="font-heading text-slate-900 font-bold text-[19px] mb-3.5">
                Specializations
              </h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
                {doctor.specializations.map((spec) => (
                  <div
                    key={spec}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5"
                  >
                    <FiCheck size={16} className="shrink-0 text-primary" />
                    <span className="text-[13.5px] font-semibold text-slate-700">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: booking + contact */}
          <div className="flex flex-col gap-6 dt:sticky dt:top-28">
            <DoctorBookingPanel
              doctor={doctor}
              onConfirm={() => setCartCount((c) => c + 1)}
            />

            {(doctor.phone || doctor.email) && (
              <div
                className={`flex flex-col gap-3 rounded-[20px] p-6 ${glass.subtle}`}
              >
                <h2 className="font-heading text-slate-900 font-bold text-[16px] m-0">
                  Contact
                </h2>
                {doctor.phone && (
                  <a
                    href={`tel:${doctor.phone}`}
                    className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
                  >
                    <FiPhone size={15} className="text-primary" />
                    {doctor.phone}
                  </a>
                )}
                {doctor.email && (
                  <a
                    href={`mailto:${doctor.email}`}
                    className="flex items-center gap-2.5 text-[13.5px] font-semibold text-slate-700"
                  >
                    <FiMail size={15} className="text-primary" />
                    {doctor.email}
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
