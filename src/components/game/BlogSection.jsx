import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts } from "@/data/blogPosts";
import ReactMarkdown from "react-markdown";

function BlogCard({ post, onOpen }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={() => onOpen(post)}
      className="text-left w-full rounded-xl border border-border bg-card p-5 space-y-3 hover:border-neon/40 transition-colors"
    >
      <div className="text-3xl">{post.emoji}</div>
      <div className="space-y-1">
        <h3 className="font-bold text-foreground leading-snug">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.subtitle}</p>
      </div>
      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/60">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readTime}</span>
      </div>
    </motion.button>
  );
}

function BlogModal({ post, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="max-w-2xl mx-auto px-6 py-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="text-xs font-mono text-muted-foreground hover:text-neon transition-colors uppercase tracking-widest mb-8 block"
        >
          ← Close
        </button>

        <div className="space-y-4 mb-8">
          <div className="text-5xl">{post.emoji}</div>
          <h1 className="text-3xl font-bold font-mono text-foreground leading-tight">{post.title}</h1>
          <p className="text-muted-foreground">{post.subtitle}</p>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground/60">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <div className="h-px bg-border" />
        </div>

        <div className="prose prose-invert prose-sm max-w-none text-muted-foreground leading-relaxed space-y-4
          prose-headings:text-foreground prose-strong:text-foreground prose-p:my-3">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  const [openPost, setOpenPost] = useState(null);

  return (
    <section className="w-full max-w-[700px] mx-auto px-4 pb-8 space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">From the Blog</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} onOpen={setOpenPost} />
        ))}
      </div>

      <AnimatePresence>
        {openPost && (
          <BlogModal post={openPost} onClose={() => setOpenPost(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}