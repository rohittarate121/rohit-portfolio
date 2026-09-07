import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Badge from "../components/ui/Badge.jsx";
import MarkdownRenderer from "../components/ui/MarkdownRenderer.jsx";
import { getPublishedPostBySlug } from "../services/blogService.js";
import { mapBlogPostFromApi } from "../utils/mapBlogPost.js";

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | notfound | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    getPublishedPostBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setPost(mapBlogPostFromApi(data));
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus(err.response?.status === 404 ? "notfound" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <p className="font-mono text-sm text-slate-dim dark:text-slate">
          Loading post…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-mono text-signal mb-2">Error</p>
          <h1 className="font-display text-2xl font-semibold mb-4">
            Couldn&rsquo;t load this post.
          </h1>
          <Link to="/blog" className="text-signal font-mono text-sm">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  if (status === "notfound" || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="font-mono text-signal mb-2">404</p>
          <h1 className="font-display text-2xl font-semibold mb-4">
            Post not found
          </h1>
          <Link to="/blog" className="text-signal font-mono text-sm">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-slate-dim dark:text-slate hover:text-signal mb-10"
        >
          <ArrowLeft size={15} /> Back to blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <Badge>{post.category}</Badge>
          <span className="text-[11px] font-mono text-slate-dim dark:text-slate">
            {formatDate(post.publishedAt)} · {post.readingTimeMinutes} min read
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-8 leading-tight">
          {post.title}
        </h1>

        <MarkdownRenderer content={post.content} />

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-12 pt-6 border-t border-void/10 dark:border-white/10">
            {post.tags.map((t) => (
              <span key={t} className="text-xs font-mono text-signal">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
