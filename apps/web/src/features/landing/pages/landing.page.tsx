import Link from "next/link";

export function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-10 px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-800">leeer</p>
      <section className="max-w-3xl space-y-6">
        <h1 className="text-5xl font-semibold leading-tight md:text-7xl">Tu historia, sin que la herramienta se ponga en medio.</h1>
        <p className="max-w-2xl text-lg leading-8 text-stone-700">Un espacio para escribir, organizar capítulos y construir el universo de una novela desde web y móvil.</p>
        <div className="flex gap-3">
          <Link className="rounded-full bg-stone-900 px-5 py-3 text-white" href="/stories">Ver ejemplo de historias</Link>
          <a className="rounded-full border border-stone-400 px-5 py-3" href="#features">Qué estamos construyendo</a>
        </div>
      </section>
      <section id="features" className="grid gap-4 md:grid-cols-3">
        {['Escritura enfocada', 'Universo narrativo', 'Betatesters'].map((item) => (
          <article key={item} className="rounded-3xl border border-stone-300 bg-white/50 p-6">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="mt-2 text-stone-600">Ejemplo mínimo de componente de landing listo para evolucionar por feature.</p>
          </article>
        ))}
      </section>
    </main>
  );
}
