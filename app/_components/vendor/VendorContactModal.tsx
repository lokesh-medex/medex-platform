"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiCheckCircle } from "react-icons/fi";
import AppInput from "@/app/_components/form/AppInput";
import AppTextArea from "@/app/_components/form/AppTextArea";
import type { Vendor } from "@/app/_lib/vendor-data";

const contactSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  email: z.string().min(1, "Enter your email").email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(1, "Enter a message"),
});

type ContactValues = z.infer<typeof contactSchema>;

interface VendorContactModalProps {
  vendor: Vendor;
  open: boolean;
  onClose: () => void;
}

/** Mocked contact form — no backend exists in this app yet, so submit just
 * shows an inline success state for ~2s, then resets and closes. */
export default function VendorContactModal({
  vendor,
  open,
  onClose,
}: VendorContactModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const { control, handleSubmit, reset } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
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
      onClose();
    }, 2000);
  }, [onClose, reset]);

  const handleCancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setSubmitted(false);
      reset();
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Contact {vendor.title}
        </span>
      }
    >
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <FiCheckCircle size={40} className="text-green-600" />
          <p className="text-slate-700 text-[14.5px] m-0">
            Message sent — {vendor.title} will get back to you shortly.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            void handleSubmit(submit)(e);
          }}
          noValidate
          className="pt-2"
        >
          <div className="mb-4">
            <AppInput
              name="name"
              control={control}
              label="Your name"
              required
            />
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
          <div className="mb-6">
            <AppTextArea
              name="message"
              control={control}
              label="Message"
              required
              rows={4}
              placeholder={`Ask ${vendor.title} a question...`}
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
      )}
    </Modal>
  );
}
