"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ROLES = [
  "Ingénieur en informatique",
  "Architecte cloud souverain",
  "Ingénieur DevOps / SRE",
  "Développeur full-stack",
];

const ctaLinks = [
  { href: "#projets", label: "cd ./projets" },
  { href: "#stack", label: "cd ./stack" },
  { href: "/blog", label: "cd ./blog" },
  { href: "#contact", label: "cd ./contact" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const [step2Visible, setStep2Visible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStep2Visible(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          65
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("deleting"), 2800);
      return () => clearTimeout(t);
    }

    if (displayed.length > 0) {
      const t = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        32
      );
      return () => clearTimeout(t);
    }
    setRoleIndex((i) => (i + 1) % ROLES.length);
    setPhase("typing");
  }, [displayed, phase, roleIndex]);

  return (
    <section className="min-h-screen flex items-center px-6 pt-20 pb-16">
      <div className="max-w-4xl w-full mx-auto">
        <div className="border border-zinc-800 rounded-lg overflow-hidden shadow-2xl shadow-black/50">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className="ml-3 text-xs text-zinc-600 font-mono">portfolio — zsh</span>
          </div>

          {/* Terminal body */}
          <div className="p-6 md:p-10 space-y-8 bg-zinc-950">
            {/* whoami */}
            <div>
              <p className="text-sm mb-4">
                <span className="text-green-400">bastian</span>
                <span className="text-zinc-600">@</span>
                <span className="text-zinc-400">portfolio</span>
                <span className="text-zinc-600">:</span>
                <span className="text-cyan-400">~</span>
                <span className="text-zinc-500"> $ </span>
                <span className="text-zinc-200">whoami</span>
              </p>
              <div className="pl-4 space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                  Bastian SOMON
                </p>
                <p className="text-lg text-green-400 min-h-[1.75rem] flex items-center">
                  {displayed}
                  <span className="inline-block w-[2px] h-5 bg-green-400 ml-0.5 animate-pulse" />
                </p>
              </div>
            </div>

            {/* bio */}
            {step2Visible && (
              <div className="animate-fade-in">
                <p className="text-sm mb-4">
                  <span className="text-green-400">bastian</span>
                  <span className="text-zinc-600">@</span>
                  <span className="text-zinc-400">portfolio</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-zinc-500"> $ </span>
                  <span className="text-zinc-200">cat bio.txt</span>
                </p>
                <div className="pl-4 space-y-2 text-sm">
                  <p className="text-zinc-400">
                    <span className="text-zinc-600 mr-2">&gt;</span>
                    4+ ans de conception de systèmes en environnements{" "}
                    <span className="text-amber-400">souverains</span> et complexes
                  </p>
                  <p className="text-zinc-400">
                    <span className="text-zinc-600 mr-2">&gt;</span>
                    Certifié{" "}
                    <span className="text-cyan-400">Scaleway Solution Architect</span>
                  </p>
                  <p className="text-zinc-400">
                    <span className="text-zinc-600 mr-2">&gt;</span>
                    Spécialiste{" "}
                    <span className="text-green-400">Cloud · DevOps · Architecture - Développement</span>
                  </p>
                </div>
              </div>
            )}

            {/* idle prompt */}
            <p className="text-sm">
              <span className="text-green-400">bastian</span>
              <span className="text-zinc-600">@</span>
              <span className="text-zinc-400">portfolio</span>
              <span className="text-zinc-600">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-zinc-500"> $ </span>
              <span className="inline-block w-2 h-4 bg-green-400 ml-0.5 align-middle animate-pulse" />
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-8">
          {ctaLinks.map((cta) => (
            <Link
              key={cta.href}
              href={cta.href}
              className="text-sm text-zinc-400 border border-zinc-800 px-4 py-2 rounded hover:border-green-400/50 hover:text-green-400 hover:bg-green-400/5 transition-all"
            >
              {cta.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
