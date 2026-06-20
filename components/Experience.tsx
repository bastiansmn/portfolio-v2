import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-zinc-500 mb-1">
            <span className="text-green-400">$</span> cat ./experience.json
          </p>
        </div>

        <div className="space-y-6 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-zinc-800" />

          {experiences.map((exp, i) => (
            <div key={i} className="pl-8 relative">
              <div className="absolute left-0 top-2 w-3.5 h-3.5 rounded-full border-2 border-green-400 bg-zinc-950" />

              <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 hover:border-zinc-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="space-y-0.5">
                    <h3 className="text-zinc-100 font-bold text-base">{exp.project}</h3>
                    <p className="text-green-400 text-sm">{exp.role}</p>
                    <p className="text-zinc-500 text-xs">
                      {exp.company}
                      {exp.location && <span className="text-zinc-700"> · {exp.location}</span>}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded font-mono shrink-0 h-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed">{exp.description}</p>

                {exp.achievements.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-xs text-zinc-500 flex items-start gap-2">
                        <span className="text-green-400 shrink-0 mt-0.5">›</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 bg-zinc-800/80 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
