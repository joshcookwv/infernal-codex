import ReactMarkdown from "react-markdown";
import { assetPath } from "@/lib/site-config";

export function NewsBody({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      components={{
        img: ({ src, alt }) => (
          // Markdown image dimensions are content-defined, so a native image preserves their ratio.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={typeof src === "string" && src.startsWith("/") ? assetPath(src) : src}
            alt={alt ?? ""}
            className="news-body-image"
          />
        ),
        a: ({ href, children }) => (
          <a href={href} className={href?.startsWith("mailto:") ? "news-article-cta" : undefined}>
            {children}
          </a>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
