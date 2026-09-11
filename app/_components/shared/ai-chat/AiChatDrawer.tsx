"use client";

/**
 * The AI Agent drawer opened from the navbar's `AiLauncherIcon`. Off-white
 * ground (matching the site's light section background, `#f8f5fa`) with a
 * faint scattered `BackdropMotifs` icon field, rather than a dense dark or
 * fully vivid panel — the color now lives in the messages themselves:
 * assistant replies carry the brand gradient as a solid card, user messages
 * are glass with dark ink text.
 *
 * `XProvider` theme here is the light algorithm (same register as the app's
 * global `ConfigProvider`) with brand-tinted tokens, scoped locally so this
 * drawer's Sender/Conversations/Input can use a bigger radius/border without
 * touching every other antd surface in the app.
 *
 * Static demo content only — `mockData.ts` — no request wired up yet.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dropdown, Button } from "antd";
import type { ThemeConfig } from "antd";
import { Drawer } from "antd";
import { XProvider, Sender } from "@ant-design/x";
import { XCard } from "@ant-design/x-card";
import { FiClock, FiX } from "react-icons/fi";
import BackdropMotifs from "@/app/_components/shared/BackdropMotifs";
import { brand } from "@/app/_lib/theme";
import { CHAT_CARD_COMPONENTS } from "./chatCatalog";
import { CHAT_COMMANDS, CHAT_SURFACE_ID } from "./mockData";
import ChatHistoryMenu from "./ChatHistoryMenu";

const CHAT_THEME: ThemeConfig = {
  token: {
    colorPrimary: brand.primary,
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBorder: "rgba(15,23,42,0.12)",
    colorText: "rgba(15,23,42,0.92)",
    colorTextPlaceholder: "rgba(15,23,42,0.4)",
    borderRadius: 12,
    fontFamily: "var(--font-manrope), sans-serif",
  },
};

/** Matches the `dt` Tailwind breakpoint used to switch the navbar layout. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1040px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

interface AiChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AiChatDrawer({ open, onClose }: AiChatDrawerProps) {
  const isDesktop = useIsDesktop();
  const [historyOpen, setHistoryOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
    <XProvider theme={CHAT_THEME}>
      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        size={isDesktop ? 440 : "100%"}
        closable={{ placement: "end" }}
        closeIcon={<FiX size={18} />}
        title={
          <div className="flex items-center gap-2">
            {/* Same pulsing-glow + orbiting-ring language as `AiLauncherIcon`
                in the navbar, scaled down — ties the drawer's header back to
                the button that opened it instead of a static logo mark. */}
            <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-1.5 rounded-full bg-[radial-gradient(circle,rgba(242,143,39,0.4),transparent_70%)] motion-safe:animate-[aiLauncherPulse_3s_ease-in-out_infinite]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-primary motion-safe:animate-[aiLauncherOrbit_6s_linear_infinite]"
              />
              <Image
                src="/medex_icon_logo.svg"
                alt=""
                width={18}
                height={18}
                className="relative"
              />
            </span>
            <span
              className="bg-clip-text font-bold text-transparent"
              style={{
                backgroundImage: `linear-gradient(100deg, ${brand.secondary}, ${brand.primary})`,
              }}
            >
              Medex Agent
            </span>
          </div>
        }
        extra={
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            open={historyOpen}
            onOpenChange={setHistoryOpen}
            popupRender={() => (
              <div className="rounded-2xl border border-slate-900/10 bg-white p-1 shadow-[0_24px_48px_rgba(15,23,42,0.18)]">
                <ChatHistoryMenu />
              </div>
            )}
          >
            <Button
              type="text"
              shape="circle"
              aria-label="Chat history"
              icon={<FiClock size={16} />}
            />
          </Dropdown>
        }
        classNames={{
          header: "border-b! border-slate-900/10!",
          body: "p-0! relative overflow-hidden",
          footer: "border-t! border-slate-900/10! p-0!",
          close:
            "flex! h-9! w-9! items-center! justify-center! rounded-full! bg-slate-900/6! text-slate-900! hover:bg-slate-900/12!",
        }}
        footer={
          <div className="p-4">
            {/* Padding-box gradient border: Sender's own surface is fully
                transparent (no `background` in its styles, verified against
                the rendered DOM), so the white div beneath it — not Sender
                itself — is what keeps the gradient confined to the 1.5px gap
                instead of showing through the whole pill. */}
            <div className="rounded-[26px] bg-[linear-gradient(100deg,var(--color-primary),#7c3aed,var(--color-secondary))] p-[1.5px]">
              <div className="rounded-3xl bg-white">
                <Sender
                  value={prompt}
                  onChange={setPrompt}
                  onSubmit={() => setPrompt("")}
                  placeholder="Ask about tests, packages, or your results..."
                />
              </div>
            </div>
          </div>
        }
      >
        <div className="relative flex h-full flex-col overflow-hidden bg-[#f8f5fa]">
          <BackdropMotifs
            count={7}
            opacity={0.05}
            color="#0f172a"
            seed={4}
            minSize={80}
            maxSize={150}
            zone="edges"
          />
          <div className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-5 [scrollbar-width:thin] [scrollbar-color:rgba(15,23,42,0.2)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-900/20 [&::-webkit-scrollbar-track]:bg-transparent">
            <XCard.Box
              commands={CHAT_COMMANDS}
              components={CHAT_CARD_COMPONENTS}
            >
              <XCard.Card id={CHAT_SURFACE_ID} />
            </XCard.Box>
          </div>
        </div>
      </Drawer>
    </XProvider>
  );
}
