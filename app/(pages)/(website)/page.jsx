"use client";
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const HomepageViewer = () => {
  const searchParams = useSearchParams();
  const book = searchParams.get("book") || "1";

  const pdfMap = {
    1: "/demo.pdf",
    2: "/demo2.pdf",
    3: "/demo3.pdf",
  };

  return (
    <div className="h-screen">
      <FlipbookViewer pdfUrl={pdfMap[book]} />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <HomepageViewer />
    </Suspense>
  );
};

export default Page;
