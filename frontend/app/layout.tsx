import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@wrksz/themes";

export const metadata: Metadata = {
  title: "Omnify",
  description: "Omnify — Connect everything in one place",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased", fontVariables)}>
        <main className="bg-background  min-h-screen">{children}</main>
      </body>
    </html>
  );
}
