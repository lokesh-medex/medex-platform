/** Static content for the AI chat drawer — no backend wired up yet. */

import type { XAgentCommand_v0_9 } from "@ant-design/x-card";
import { CHAT_CATALOG_ID } from "./chatCatalog";

export interface ChatHistoryItem {
  key: string;
  label: string;
}

export const CHAT_HISTORY: ChatHistoryItem[] = [
  { key: "h1", label: "Best supplements for iron deficiency" },
  { key: "h2", label: "CBC vs CMP — what's the difference?" },
  { key: "h3", label: "Post-workout recovery checklist" },
  { key: "h4", label: "Vitamin D dosage guidelines" },
  { key: "h5", label: "Book a same-day lab test" },
  { key: "h6", label: "Signs of thyroid imbalance" },
];

export const CHAT_SURFACE_ID = "conversation";

export const CHAT_COMMANDS: XAgentCommand_v0_9[] = [
  {
    version: "v0.9",
    createSurface: { surfaceId: CHAT_SURFACE_ID, catalogId: CHAT_CATALOG_ID },
  },
  {
    version: "v0.9",
    updateComponents: {
      surfaceId: CHAT_SURFACE_ID,
      components: [
        {
          id: "root",
          component: "Column",
          children: ["greeting", "userQuestion", "recommendation", "followUp"],
        },
        {
          id: "greeting",
          component: "ChatBubble",
          role: "assistant",
          text: "Hi, I'm the Medex AI Agent. Ask me about lab tests, packages, or your health goals.",
        },
        {
          id: "userQuestion",
          component: "ChatBubble",
          role: "user",
          text: "Which package fits a general health checkup?",
        },
        {
          id: "recommendation",
          component: "PackageCard",
          title: "Executive Health Package",
          description:
            "40+ biomarkers covering heart, liver, kidney, and metabolic health, plus a doctor consultation.",
          price: "฿4,900",
          ctaLabel: "View package",
          action: {
            event: {
              name: "view-package",
              context: { packageId: "executive-health" },
            },
          },
        },
        {
          id: "followUp",
          component: "ChatBubble",
          role: "assistant",
          text: "Want me to compare it with the Basic Wellness Package?",
        },
      ],
    },
  },
];
