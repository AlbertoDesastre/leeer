import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "leeer — escribe historias que merecen ser leídas",
  description: "Espacio de escritura, planificación y lectura para autores.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
