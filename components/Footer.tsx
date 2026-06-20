export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8 px-6 mt-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-mono">
        <span>
          <span className="text-green-400">bastian</span>
          <span className="text-zinc-700">@portfolio</span>
          <span className="text-zinc-600">:~$</span>
          <span className="inline-block w-1.5 h-3 bg-zinc-700 ml-1 align-middle animate-pulse" />
        </span>
        <span>© 2025 Bastian SOMON — Construit avec Next.js &amp; Tailwind</span>
      </div>
    </footer>
  );
}
