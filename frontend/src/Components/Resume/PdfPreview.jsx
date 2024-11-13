import React from "react";

const PdfPreview = ({ url, width, height, className }) => {
  return (
    <div
      className={`inset-0 flex flex-col items-center justify-start p-3 lg:m-1 mt-3 md:px-10 z-20 ${className}`}
    >
      <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-xl md:max-w-5xl md:w-full max-h-screen z-40">
        <div className="overflow-y-auto">
          {/* <embed width="100%" height="100%" src="https://pdfobject.com/pdf/sample-3pp.pdf"></embed> */}
          <iframe
            className={className}
            style={{ height: "-webkit-fill-available" }}
            width={width}
            height={height}
            src={`${url}#toolbar=0&navpanes=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
