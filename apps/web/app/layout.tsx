import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-source-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "leeer — escribe historias que merecen ser leídas",
  description: "Espacio de escritura, planificación y lectura para autores.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
