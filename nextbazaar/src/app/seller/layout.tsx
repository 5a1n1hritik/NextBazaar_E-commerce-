"use client";

export const dynamic = "force-dynamic";
import type React from "react";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen bg-gray-100 dark:bg-black">
          <Sidebar />
          <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
