import ReactMarkdown from "react-markdown";

export function NewsBody({ markdown }: { markdown: string }) {
  return <ReactMarkdown>{markdown}</ReactMarkdown>;
}
