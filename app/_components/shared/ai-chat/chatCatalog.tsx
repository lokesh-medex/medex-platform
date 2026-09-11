"use client";

/**
 * Local A2UI catalog for the AI chat drawer's message thread. Registered once
 * at module load (x-card requires `registerCatalog` before the tree mounts) —
 * see `mockData.ts` for the static commands that reference these components.
 */

import type { ReactNode } from "react";
import { Button } from "antd";
import { FiArrowRight } from "react-icons/fi";
import { registerCatalog } from "@ant-design/x-card";
import type { Catalog } from "@ant-design/x-card";
import { glass } from "@/app/_lib/glass";

export const CHAT_CATALOG_ID = "local://medex-ai-chat.json";

registerCatalog({
  catalogId: CHAT_CATALOG_ID,
  components: {
    Column: { type: "object", properties: { children: {} } },
    ChatBubble: {
      type: "object",
      properties: {
        role: { type: "string" },
        text: { type: "string" },
      },
      required: ["role", "text"],
    },
    PackageCard: {
      type: "object",
      properties: {
        title: { type: "string" },
        description: { type: "string" },
        price: { type: "string" },
        ctaLabel: { type: "string" },
        action: {},
      },
      required: ["title", "description"],
    },
  },
} satisfies Catalog);

function Column({ children }: { children?: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>;
}

function ChatBubble({
  role,
  text,
}: {
  role: "user" | "assistant";
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? // Glass over the drawer's off-white ground — `glass.subtle` is
              // mostly opaque, so it reads cleanly there instead of looking
              // like a flat grey box the way low-opacity glass would.
              `max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-sm font-medium text-slate-900 ${glass.subtle}`
            : // The agent's signature gradient carries the color now that the
              // drawer ground itself is off-white — each stop is dimmed with
              // a little black via `color-mix` so it reads as rich rather
              // than neon.
              "max-w-[85%] rounded-2xl rounded-bl-md bg-[linear-gradient(135deg,color-mix(in_oklch,var(--color-primary)_82%,black),color-mix(in_oklch,#e11d48_82%,black),color-mix(in_oklch,#7c3aed_82%,black),color-mix(in_oklch,var(--color-secondary)_82%,black))] px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(135,40,136,0.25)]"
        }
      >
        {text}
      </div>
    </div>
  );
}

interface PackageCardProps {
  title: string;
  description: string;
  price?: string;
  ctaLabel?: string;
  action?: { event?: { name: string; context?: Record<string, unknown> } };
  onAction?: (context: Record<string, unknown>) => void;
}

function PackageCard({
  title,
  description,
  price,
  ctaLabel,
  action,
  onAction,
}: PackageCardProps) {
  return (
    <div
      className={`relative flex flex-col gap-2.5 overflow-hidden rounded-2xl p-4 ${glass.subtle}`}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.75 bg-[linear-gradient(90deg,var(--color-primary),#e11d48,#7c3aed,var(--color-secondary))]"
      />
      <div className="flex items-start justify-between gap-3">
        <p className="font-bold text-slate-900">{title}</p>
        {price && (
          <span className="shrink-0 rounded-full bg-[linear-gradient(100deg,var(--color-primary),var(--color-secondary))] px-2.5 py-1 text-xs font-bold whitespace-nowrap text-white shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            {price}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-600">{description}</p>
      {ctaLabel && (
        <Button
          type="text"
          size="small"
          onClick={() => onAction?.(action?.event?.context ?? {})}
          className="flex! h-auto! w-fit! items-center! gap-1! rounded-full! bg-[linear-gradient(100deg,var(--color-primary),var(--color-secondary))]! px-3! py-1.5! text-xs! font-bold! text-white! font-sans"
        >
          {ctaLabel}
          <FiArrowRight size={12} />
        </Button>
      )}
    </div>
  );
}

/** Stable reference — x-card remounts its tree if this object is recreated. */
export const CHAT_CARD_COMPONENTS = { Column, ChatBubble, PackageCard };
