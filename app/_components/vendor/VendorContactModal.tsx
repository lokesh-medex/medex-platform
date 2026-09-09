"use client";

import { Modal } from "antd";
import type { Vendor } from "@/app/_lib/vendor-data";

interface VendorContactModalProps {
  vendor: Vendor;
  open: boolean;
  onClose: () => void;
}

/** Placeholder — Task 7 replaces this body with the real contact form. */
export default function VendorContactModal({
  vendor,
  open,
  onClose,
}: VendorContactModalProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={
        <span className="font-heading text-slate-900 font-bold text-lg">
          Contact {vendor.title}
        </span>
      }
    >
      <p className="text-slate-500 text-sm">Contact form coming soon.</p>
    </Modal>
  );
}
