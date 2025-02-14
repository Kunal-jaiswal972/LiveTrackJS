import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard, ClipboardCheck } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { ContentLayout } from "@/components/shared/ContentLayout";

export default function DocsPage() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/README.md")
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <ContentLayout title="Documentation">
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-emerald-600 text-3xl font-bold mb-4"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-emerald-500 text-2xl font-semibold mb-3"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="text-emerald-400 text-xl font-medium mb-2"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong
              className="text-emerald-500 font-semibold bg-emerald-100 p-1 rounded mr-2"
              {...props}
            />
          ),
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <CodeBlockWithCopy
                language={match[1]}
                value={String(children).replace(/\n$/, "")}
                props={{ ...props, className }}
              />
            ) : (
              <code
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
        className="prose prose-green dark:prose-invert max-w-none"
      />
    </ContentLayout>
  );
}

function CodeBlockWithCopy({ language, value, props }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`absolute top-2 right-2 p-2 border-[1px] ${
          copied
            ? "bg-emerald-500 text-white"
            : "border-emerald-500 text-emerald-500"
        } rounded-lg shadow-lg transition duration-200`}
        type="button"
        onClick={handleCopy}
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <ClipboardCheck className="w-4 h-4 text-white" />
        ) : (
          <Clipboard className="w-4 h-4 text-emerald-500" />
        )}
      </motion.button>

      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        {...props}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}
