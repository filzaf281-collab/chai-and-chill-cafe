import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chai & Chill Cafe | Best Chai in Town",
  description: "Experience authentic aromatic Karak Chai, gourmet snacks, artisanal brews, and cozy aesthetic vibes at Chai & Chill Cafe.",
  keywords: ["chai", "cafe", "karak chai", "zafrani chai", "cold coffee", "snacks", "chill vibes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-[#FFFDF9] text-[#2F1E14] antialiased selection:bg-[#BC9671]/30 selection:text-[#2F1E14]">
        {children}
      </body>
    </html>
  );
}
