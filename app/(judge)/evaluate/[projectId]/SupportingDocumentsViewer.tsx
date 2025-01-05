import React from "react";

interface GoogleDrivePosterViewerProps {
  posterLink: string;
  width?: number;
  height?: number;
}

export const SupportingDocumentsViewer: React.FC<
  GoogleDrivePosterViewerProps
> = ({ posterLink, width = 640, height = 480 }) => {
  const viewerUrl = posterLink;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Supporting Documents</h2>
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        <iframe
          src={viewerUrl}
          width={width}
          height={height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
