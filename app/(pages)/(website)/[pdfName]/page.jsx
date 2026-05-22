import React from "react";
import FlipbookViewer from "@/app/_components/ui/flipbook-viewer/flipbook-viewer";

const Page = ({ params }) => {
  const { pdfName } = params;
  const pdfUrl = `/${pdfName}.pdf`;

  return (
    <div className="h-screen overflow-hidden">
      <FlipbookViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default Page;
