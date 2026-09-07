import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Badge from "../components/ui/Badge.jsx";
import Eyebrow from "../components/ui/Eyebrow.jsx";
import { getPublishedPosts } from "../services/blogService.js";
import { mapBlogPostFromApi } from "../utils/mapBlogPost.js";

function PostCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="h-3 w-20 bg-void/10 dark:bg-white/10 rounded mb-3" />
      <div className="h-5 w-3/4 bg-void/10 dark:bg-white/10 rounded mb-3" />
      <div className="h-3 w-full bg-void/5 dark:bg-white/5 rounded mb-2" />
      <div className="h-3 w-2/3 bg-void/5 dark:bg-white/5 rounded" />
    </Card>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    getPublishedPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data.map(mapBlogPostFromApi));
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Eyebrow>GET /blog</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-slate-dim dark:text-slate mb-10 max-w-xl">
          Notes on Java, Spring Boot, React, and building full-stack systems.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-dim dark:text-slate"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts…"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-md border border-void/15 dark:border-white/15 bg-transparent text-sm outline-none focus:border-signal transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                  activeCategory === c
                    ? "bg-signal text-white border-signal"
                    : "border-void/15 dark:border-white/15 text-slate-dim dark:text-slate hover:border-signal hover:text-signal"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {status === "loading" && (
          <div className="grid sm:grid-cols-2 gap-5">
            <PostCardSkeleton />
            <PostCardSkeleton />
          </div>
        )}

        {status === "error" && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Couldn&rsquo;t load posts right now — the API may be offline. Try
            refreshing.
          </Card>
        )}

        {status === "success" && filteredPosts.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            {posts.length === 0
              ? "No posts published yet."
              : "No posts match your search."}
          </Card>
        )}

        {status === "success" && filteredPosts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-5">
            {filteredPosts.map((p) => (
              <Card
                key={p.slug}
                as={Link}
                to={`/blog/${p.slug}`}
                className="p-6 hover:border-signal/40 transition-colors flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Badge>{p.category}</Badge>
                  <span className="text-[11px] font-mono text-slate-dim dark:text-slate">
                    {p.readingTimeMinutes} min read
                  </span>
                </div>
                <h2 className="font-display font-semibold text-lg mb-2">
                  {p.title}
                </h2>
                <p className="text-sm text-slate-dim dark:text-slate leading-relaxed mb-4">
                  {p.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] font-mono text-signal">
                      #{t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
