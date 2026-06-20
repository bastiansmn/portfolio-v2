import { projects } from "@/data/projects";
import { ExternalLink } from "lucide-react";

const statusConfig = {
  production: {
    dot: "bg-green-400",
    text: "text-green-400",
    border: "border-green-400/30",
    bg: "bg-green-400/5",
    label: "production",
  },
  beta: {
    dot: "bg-amber-400",
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
    label: "beta",
  },
  wip: {
    dot: "bg-zinc-500",
    text: "text-zinc-500",
    border: "border-zinc-600/30",
    bg: "bg-zinc-600/5",
    label: "wip",
  },
};

export default function Projects() {
  return (
    <section id="projets" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-zinc-500 mb-1">
            <span className="text-green-400">$</span> ls ./projets
          </p>
          <p className="text-xs text-zinc-700">
            {projects.length} items found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const s = statusConfig[project.status];
            return (
              <div
                key={project.name}
                className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-zinc-100 font-semibold">{project.name}</h3>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    {project.year && (
                      <span className="text-xs text-zinc-600 font-mono">
                        {project.year}
                      </span>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-600 hover:text-zinc-300 transition-colors"
                        aria-label={`Voir ${project.name}`}
                      >
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded border font-mono mb-3 w-fit ${s.text} ${s.border} ${s.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {s.label}
                </span>

                <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-cyan-400/70 bg-cyan-400/5 border border-cyan-400/20 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
