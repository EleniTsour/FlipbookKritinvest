'use client';
import React, { memo, useState, useEffect, useCallback } from 'react';
import useRefSize from '@/app/_hooks/use-ref-size';
import FlipbookLoader from './flipbook-loader';
import { cn } from '@/app/_lib/utils';
import { TransformComponent } from 'react-zoom-pan-pinch';
import screenfull from 'screenfull';

const Flipbook = memo(({ viewerStates, setViewerStates, flipbookRef, pdfDetails, availableHeight }) => {
    const { ref, width, height, refreshSize } = useRefSize();
    const [scale, setScale] = useState(1); // Max scale for flipbook
    const [wrapperCss, setWrapperCss] = useState({});
    const [viewRange, setViewRange] = useState([0, 4]);

    // Calculate scale when pageSize or dimensions change >>>>>>>>
    useEffect(() => {
        if (pdfDetails && width && height) {
            const verticalBuffer = 48;
            const fitScale = Math.min(
                width / (2 * pdfDetails.width),
                Math.max(height - verticalBuffer, 320) / pdfDetails.height
            );
            const calculatedScale = fitScale * 0.98;
            setScale(calculatedScale);
            setWrapperCss({
                width: `${pdfDetails.width * calculatedScale * 2}px`,
                height: `${pdfDetails.height * calculatedScale}px`,
            });
        }
    }, [pdfDetails, width, height]);

    // Refresh flipbook size & page range on window resize >>>>>>>>
    const shrinkPageLoadingRange = useCallback(() => {
        setViewRange([Math.max(viewerStates.currentPageIndex - 2, 0), Math.min(viewerStates.currentPageIndex + 2, pdfDetails.totalPages)]);
    }, [viewerStates.currentPageIndex, pdfDetails.totalPages, setViewRange]);

    const handleFullscreenChange = useCallback(() => {
        shrinkPageLoadingRange();
        refreshSize();
    }, [shrinkPageLoadingRange, refreshSize]);

    useEffect(() => {
        if (screenfull) {
            screenfull.on('change', handleFullscreenChange);
        }
        // Clean up the event listener
        return () => {
            if (screenfull) {
                screenfull.off('change', handleFullscreenChange);
            }
        };
    }, [handleFullscreenChange]);

    return (
        <div
            ref={ref}
            className={cn("relative h-[30rem] xs:h-[30rem] lg:h-[52rem] xl:h-[56rem] w-full bg-transparent flex justify-center items-center overflow-hidden")}
            style={availableHeight ? { height: `${availableHeight}px` } : undefined}
        >
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
                <div className='overflow-hidden flex justify-center items-center h-full w-full'>
                    {pdfDetails && scale && (
                        <div style={wrapperCss}>
                            <FlipbookLoader
                                ref={flipbookRef}
                                pdfDetails={pdfDetails}
                                scale={scale}
                                viewRange={viewRange}
                                setViewRange={setViewRange}
                                viewerStates={viewerStates}
                                setViewerStates={setViewerStates}
                            />
                        </div>
                    )}
                </div>
            </TransformComponent>
        </div>
    );
});

Flipbook.displayName = 'Flipbook';
export default Flipbook;
