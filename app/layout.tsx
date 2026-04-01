import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Onda Verde | Área de Sócios Rio Ave FC",
    description: "Plataforma digital exclusiva para sócios do Rio Ave FC.",
    appleWebApp: { capable: true, statusBarStyle: "default", title: "Onda Verde" },
};

export const viewport: Viewport = {
    themeColor: "#006437",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="pt" suppressHydrationWarning>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                  {children}
                </body>body>
          </html>html>
        );
}</html>
