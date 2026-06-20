import { stack } from "@/data/stack";

const levelDots: Record<string, string> = {
  expert: "●●●",
  avancé: "●●○",
  intermédiaire: "●○○",
};

const levelColor: Record<string, string> = {
  expert: "text-green-400",
  avancé: "text-cyan-400",
  intermédiaire: "text-zinc-500",
};

export default function Stack() {
  return (
    <section id="stack" className="py-24 px-6 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm text-zinc-500 mb-1">
            <span className="text-green-400">$</span> cat ./stack.yml
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stack.map((category) => (
            <div
              key={category.category}
              className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40"
            >
              <h3 className="text-zinc-100 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="text-green-400 font-normal">#</span>
                {category.category}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-zinc-300 text-xs truncate">{skill.name}</span>
                      {skill.certified && (
                        <span className="text-xs text-amber-400 border border-amber-400/30 bg-amber-400/5 px-1.5 py-0.5 rounded font-mono shrink-0">
                          cert
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono tracking-widest shrink-0 ${levelColor[skill.level]}`}>
                      {levelDots[skill.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-8 text-xs text-zinc-600 font-mono">
          <span className="flex items-center gap-2">
            <span className="text-green-400">●●●</span> expert
          </span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">●●○</span> avancé
          </span>
          <span className="flex items-center gap-2">
            <span className="text-zinc-500">●○○</span> intermédiaire
          </span>
        </div>
      </div>
    </section>
  );
}
