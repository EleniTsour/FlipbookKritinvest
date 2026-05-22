"use client";
import React, { useCallback, useRef, useState } from "react";
import Toolbar from "./toolbar/toolbar";
import { cn } from "@/app/_lib/utils";
import Flipbook from "./flipbook/flipbook";
import screenfull from "screenfull";
import { TransformWrapper } from "react-zoom-pan-pinch";
import { Document } from "react-pdf";
import PdfLoading from "./pad-loading/pdf-loading";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const FlipbookViewer = ({ pdfUrl, className }) => {
  const containerRef = useRef(); // For full screen container
  const flipbookRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [viewerStates, setViewerStates] = useState({
    currentPageIndex: 0,
    zoomScale: 1,
  });

  // Setting pdf details on document load >>>>>>>>>
  const onDocumentLoadSuccess = useCallback(async (document) => {
    try {
      const pageDetails = await document.getPage(1);
      setPdfDetails({
        totalPages: document.numPages,
        width: pageDetails.view[2],
        height: pageDetails.view[3],
      });
      setPdfLoading(false);
    } catch (error) {
      console.error("Error loading document:", error);
    }
  }, []);

  return (
    <div ref={containerRef} className="flex h-full w-full flex-col overflow-hidden">
      {pdfLoading && <PdfLoading />}
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<></>}
      >
        {pdfDetails && !pdfLoading && (
          <TransformWrapper
          wrapperStyle={{ height: "100%", width: "100%" }}
          contentStyle={{ height: "100%", width: "100%" }}
            doubleClick={{ disabled: true }}
            pinch={{ step: 2 }}
            disablePadding={viewerStates?.zoomScale <= 1}
            initialScale={1}
            minScale={1}
            maxScale={5}
            onTransformed={({ state }) =>
              setViewerStates({ ...viewerStates, zoomScale: state.scale })
            }
          >
            <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
              <div className="min-h-0 flex-1 overflow-hidden">
                <Flipbook
                  viewerStates={viewerStates}
                  setViewerStates={setViewerStates}
                  flipbookRef={flipbookRef}
                  screenfull={screenfull}
                  pdfDetails={pdfDetails}
                />
              </div>
              <div className="shrink-0">
                <Toolbar
                  viewerStates={viewerStates}
                  setViewerStates={setViewerStates}
                  containerRef={containerRef}
                  flipbookRef={flipbookRef}
                  screenfull={screenfull}
                  pdfDetails={pdfDetails}
                />
              </div>
            </div>
          </TransformWrapper>
        )}
      </Document>
    </div>
  );
};

export default FlipbookViewer;
