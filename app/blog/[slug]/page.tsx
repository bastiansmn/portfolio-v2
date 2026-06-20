import { getPost, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Bastian SOMON`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-zinc-600 hover:text-green-400 transition-colors mb-8"
        >
          <ArrowLeft size={12} />
          cd ./blog
        </Link>

        <div className="mb-8">
          <p className="text-sm text-zinc-500 mb-6">
            <span className="text-green-400">$</span> cat ./blog/{post.slug}.mdx
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
            {post.date && (
              <span className="flex items-center gap-1.5">
                <Calendar size={11} />
                {post.date}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {post.readingTime} min de lecture
            </span>
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-cyan-400/60">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="prose prose-invert prose-zinc max-w-none prose-headings:font-mono prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-p:leading-relaxed prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-code:text-green-400 prose-code:bg-zinc-900 prose-code:px-1 prose-code:rounded prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-strong:text-zinc-200 prose-li:text-zinc-400">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </div>
    </main>
  );
}
