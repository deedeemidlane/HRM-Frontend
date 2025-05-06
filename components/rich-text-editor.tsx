"use client"

import { useEffect, useRef, useState } from "react"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { Skeleton } from "./ui/skeleton"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  error?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  error,
}: RichTextEditorProps) {
  const quillRef = useRef<ReactQuill>(null)
  const [isFocused, setIsFocused] = useState(false)

  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true)
  // }, [])

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      // ["clean"],
    ],
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    // "bullet",
    "link",
  ]

  // if (!mounted) {
  //   return <Skeleton className="h-[200px] w-full" />
  // }

  return (
    <div
      className={`rich-text-editor ${error ? "has-error" : ""} ${className}`}
    >
      <style jsx global>{`
        .rich-text-editor .quill {
          border-radius: 0.375rem;
          border: 1px solid hsl(var(--input));
          background-color: hsl(var(--background));
        }

        .rich-text-editor.has-error .quill {
          border-color: hsl(var(--destructive));
        }

        .rich-text-editor .quill:focus-within {
          outline: 2px solid hsl(var(--ring));
          outline-offset: -1px;
        }

        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          border-bottom: 1px solid hsl(var(--border));
          background-color: hsl(var(--muted));
        }

        .rich-text-editor .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          min-height: 120px;
          font-size: 0.875rem;
        }

        .rich-text-editor .ql-editor {
          min-height: 120px;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: hsl(var(--muted-foreground));
          font-style: normal;
        }
      `}</style>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  )
}
