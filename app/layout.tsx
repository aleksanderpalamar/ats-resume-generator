import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ATS Resume Generator",
  description: "ATS Resume Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppinsFont.className} antialiased bg-zinc-50`}
      >
        {children}
      </body>
    </html>
  );
}
