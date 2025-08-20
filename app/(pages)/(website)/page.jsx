"use client";

import { Suspense } from "react";
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer";
import { useSearchParams } from "next/navigation";

function FlipbookClient() {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "1";

  const pdfMap = {
    1: "/demo.pdf",
    2: "/demo2.pdf",
    3: "/demo3.pdf",
  };

  return <FlipbookViewer pdfUrl={pdfMap[book]} />;
}

export default function Page() {
  return (
    <div className="h-screen">
      <Suspense fallback={<div>Loading book...</div>}>
        <FlipbookClient />
      </Suspense>
    </div>
  );
}
