import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: (props) => (
            <h2
              className="font-display text-2xl font-semibold mt-10 mb-4"
              {...props}
            />
          ),
          h2: (props) => (
            <h3
              className="font-display text-xl font-semibold mt-8 mb-3"
              {...props}
            />
          ),
          h3: (props) => (
            <h4
              className="font-display text-lg font-semibold mt-6 mb-2"
              {...props}
            />
          ),
          p: (props) => (
            <p
              className="text-slate-dim dark:text-slate leading-relaxed mb-4"
              {...props}
            />
          ),
          a: (props) => (
            <a
              className="text-signal underline underline-offset-2 hover:text-signal-dim"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          ul: (props) => (
            <ul
              className="list-disc list-inside space-y-1.5 mb-4 text-slate-dim dark:text-slate"
              {...props}
            />
          ),
          ol: (props) => (
            <ol
              className="list-decimal list-inside space-y-1.5 mb-4 text-slate-dim dark:text-slate"
              {...props}
            />
          ),
          blockquote: (props) => (
            <blockquote
              className="border-l-2 border-signal/40 pl-4 italic text-slate-dim dark:text-slate mb-4"
              {...props}
            />
          ),
          code(props) {
            const { children, className, ...rest } = props;
            const isFencedBlock = /language-(\w+)/.test(className || "");
            if (isFencedBlock) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="font-mono text-[0.85em] px-1.5 py-0.5 rounded bg-void/[0.05] dark:bg-white/[0.08] text-signal"
                {...rest}
              >
                {children}
              </code>
            );
          },
          pre: (props) => (
            <pre
              className="rounded-lg bg-void-surface dark:bg-void-soft border border-void/10 dark:border-white/10 p-4 overflow-x-auto mb-6 text-sm"
              {...props}
            />
          ),
          table: (props) => (
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse" {...props} />
            </div>
          ),
          th: (props) => (
            <th
              className="text-left font-mono text-xs uppercase tracking-wide text-slate-dim dark:text-slate border-b border-void/10 dark:border-white/10 py-2 pr-4"
              {...props}
            />
          ),
          td: (props) => (
            <td
              className="py-2 pr-4 border-b border-void/5 dark:border-white/5"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
