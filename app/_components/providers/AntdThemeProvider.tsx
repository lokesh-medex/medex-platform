"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";
import { antdTheme } from "@/app/_lib/theme";

/** Applies the site's brand theme (app/_lib/theme.ts) to every antd component. */
export default function AntdThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>;
}
