import React from 'react';

const PdfViewer = ({ fileUrl }) => {
  return (
    <div>
      <iframe
        src={`https://docs.google.com/gview?url=${fileUrl}&embedded=true`}
        className="w-full h-[90vh]"
        title="PDF Viewer"
        aria-label="PDF Viewer"
      />
    </div>
  );
};

export default PdfViewer;
