import FlipbookViewer from '@/app/_components/ui/flipbook-viewer/flipbook-viewer'
import React from 'react'

const Page = () => {
  return (
    <div className="h-screen">
      <FlipbookViewer pdfUrl='/demo.pdf' />
    </div>
  )
}

export default Page