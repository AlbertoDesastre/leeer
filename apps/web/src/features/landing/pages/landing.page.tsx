import Link from "next/link";

import { LandingFeatureSelector } from "../components/landing-feature-selector";

export function LandingPage() {
  return (
    <main>
      <section className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-10 px-6 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">leeer</p>
        <div className="space-y-6">
          <h1 className="font-serif text-5xl font-semibold leading-tight md:text-7xl">
            Tu historia, sin que la herramienta se ponga en medio.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Un espacio para escribir, organizar capítulos y construir el universo de una novela desde web y móvil.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 cursor-pointer items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="/stories"
            >
              Ver ejemplo de historias
            </Link>
            <a
              className="inline-flex min-h-11 cursor-pointer items-center rounded-md border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              href="#features"
            >
              Qué estamos construyendo
            </a>
          </div>
        </div>
      </section>

      <LandingFeatureSelector />
    </main>
  );
}
