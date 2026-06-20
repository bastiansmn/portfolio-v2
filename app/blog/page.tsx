import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Bastian SOMON",
  description: "Articles techniques sur le cloud, le DevOps et l'architecture de systèmes.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-green-400 transition-colors mb-8"
          >
            <ArrowLeft size={12} />
            cd ..
          </Link>
        </div>

        <div className="mb-12">
          <p className="text-sm text-zinc-500 mb-1">
            <span className="text-green-400">$</span> ls ./blog --sort=date
          </p>
          <p className="text-xs text-zinc-700">
            {posts.length} article{posts.length !== 1 ? "s" : ""} trouvé
            {posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="border border-zinc-800 rounded-lg p-8 text-center">
            <p className="text-zinc-500 text-sm">Aucun article pour le moment.</p>
            <p className="text-zinc-700 text-xs mt-1 font-mono">// coming soon</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all">
                  <h2 className="text-zinc-100 font-semibold mb-2">{post.title}</h2>
                  <p className="text-zinc-400 text-sm mb-4">{post.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                    {post.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={11} />
                        {post.date}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      {post.readingTime} min
                    </span>
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-cyan-400/60">
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
