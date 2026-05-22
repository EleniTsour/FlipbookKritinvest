"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Toolbar from "./toolbar/toolbar";
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
  const toolbarRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfDetails, setPdfDetails] = useState(null);
  const [availableHeight, setAvailableHeight] = useState(null);
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

  useEffect(() => {
    const updateAvailableHeight = () => {
      if (!containerRef.current) {
        return;
      }

      const containerHeight = containerRef.current.clientHeight;
      const toolbarHeight = toolbarRef.current?.offsetHeight || 0;
      const nextHeight = Math.max(containerHeight - toolbarHeight, 320);

      setAvailableHeight((currentHeight) =>
        currentHeight === nextHeight ? currentHeight : nextHeight
      );
    };

    updateAvailableHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateAvailableHeight();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    if (toolbarRef.current) {
      resizeObserver.observe(toolbarRef.current);
    }

    window.addEventListener("resize", updateAvailableHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateAvailableHeight);
    };
  }, [pdfDetails]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
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
            <div className="flex flex-col flex-grow overflow-hidden" style={{ height: "100%" }}>
              <div className="flex-1 overflow-hidden">
                <Flipbook
                  viewerStates={viewerStates}
                  setViewerStates={setViewerStates}
                  flipbookRef={flipbookRef}
                  screenfull={screenfull}
                  pdfDetails={pdfDetails}
                  availableHeight={availableHeight}
                />
              </div>
              <div ref={toolbarRef}>
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
