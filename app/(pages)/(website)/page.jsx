"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer";

export default function Page() {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "1";

  const pdfMap = {
    1: "/demo.pdf",
    2: "/demo2.pdf",
    3: "/demo3.pdf",
  };

  return (
    <div className="h-screen">
      <Suspense fallback={<div>Loading book...</div>}>
        <FlipbookViewer pdfUrl={pdfMap[book]} />
      </Suspense>
    </div>
  );
}
