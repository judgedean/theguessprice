import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Blog() {
  useEffect(() => {
    document.title = "Blog | TheGuessPrice";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Tips, psychology, and curiosities about prices and consumer behaviour. The TheGuessPrice blog.";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="mb-10">
            <h1 className="text-4xl font-bold font-grotesk text-foreground mb-3">Blog</h1>
            <p className="text-muted-foreground font-mono text-sm">Price psychology, weird products, and consumer curiosities.</p>
            <div className="h-0.5 w-full bg-gradient-to-r from-neon/60 via-neon/20 to-transparent mt-4" />
          </div>

          <div className="space-y-6">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-neon/40 transition-colors group"
              >
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-3">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-neon transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-neon font-mono text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}