import React from 'react'

const PdfViewer = ({ fileUrl }) => {
  return (
    <div>
        <iframe src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`} 
        className='w-full h-[90vh]'/>
    </div>
  )
}

export default PdfViewer