import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getPostBySlug } from "@/data/blogPosts";
import Footer from "@/components/Footer";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Guess The Price`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
      meta.content = post.metaDescription;
    } else {
      document.title = "Post Not Found | Guess The Price";
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-foreground font-mono text-lg">Post not found.</p>
        <Link to="/blog" className="text-neon font-mono text-sm hover:opacity-80">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-muted-foreground font-mono text-xs hover:text-neon transition-colors mb-8">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-4">
            <Calendar className="w-3 h-3" />
            {post.date}
          </div>

          <h1 className="text-3xl font-bold font-grotesk text-foreground leading-tight mb-6">{post.title}</h1>

          <div className="h-0.5 w-full bg-gradient-to-r from-neon/60 via-neon/20 to-transparent mb-8" />

          <div className="prose-blog">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="text-muted-foreground leading-relaxed mb-4 text-sm">{children}</p>,
                strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                a: ({ href, children }) => (
                  <a href={href} className="text-neon hover:opacity-80 transition-opacity underline underline-offset-2">
                    {children}
                  </a>
                ),
                h2: ({ children }) => <h2 className="text-xl font-bold text-foreground mt-8 mb-3">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-bold text-foreground mt-6 mb-2">{children}</h3>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-4 text-muted-foreground text-sm">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-4 text-muted-foreground text-sm">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-neon/60 pl-4 my-4 text-muted-foreground italic">{children}</blockquote>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="mt-12 rounded-xl border border-neon/30 bg-neon/5 p-6 text-center">
            <p className="text-foreground font-semibold mb-2">Ready to test your price instincts?</p>
            <p className="text-muted-foreground text-sm mb-4 font-mono">5 rounds. Real products. Real prices. No cheating.</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase font-mono bg-neon text-primary-foreground neon-glow hover:opacity-90 transition-opacity"
            >
              Play Now →
            </Link>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}