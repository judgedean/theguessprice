import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BLOG_POSTS as blogPosts } from "@/data/blogPosts";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogSection() {
  return (
    <section className="w-full max-w-[700px] mx-auto px-4 pb-8 space-y-5">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">From the Blog</span>
        <div className="flex-1 h-px bg-border" />
        <Link to="/blog" className="text-xs font-mono text-neon hover:opacity-80 transition-opacity">View all →</Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {blogPosts.slice(-3).reverse().map((post, i) => (
          <motion.div key={post.slug} whileHover={{ y: -2 }}>
            <Link
              to={`/blog/${post.slug}`}
              className="block text-left w-full rounded-xl border border-border bg-card p-5 space-y-3 hover:border-neon/40 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="font-bold text-foreground leading-snug text-sm">{post.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground/60">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                <ArrowRight className="w-3 h-3 text-neon" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}