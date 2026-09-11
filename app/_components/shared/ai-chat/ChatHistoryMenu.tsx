"use client";

/** Popover content for the drawer's history icon — search bar + past chat titles. */

import { useMemo, useState } from "react";
import { Input } from "antd";
import { Conversations } from "@ant-design/x";
import { FiSearch } from "react-icons/fi";
import { CHAT_HISTORY } from "./mockData";

export default function ChatHistoryMenu() {
  const [query, setQuery] = useState("");
  const [activeKey, setActiveKey] = useState<string>();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CHAT_HISTORY.filter((h) => h.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="flex w-72 flex-col gap-2 p-1">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        prefix={<FiSearch size={14} />}
        placeholder="Search chat history"
        className="rounded-full!"
      />
      <div className="max-h-72 overflow-y-auto">
        {items.length ? (
          <Conversations
            items={items}
            activeKey={activeKey}
            onActiveChange={setActiveKey}
          />
        ) : (
          <p className="px-2 py-6 text-center text-xs text-slate-400">
            No matching conversations
          </p>
        )}
      </div>
    </div>
  );
}
