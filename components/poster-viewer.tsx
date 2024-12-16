import React from "react";

interface GoogleDrivePosterViewerProps {
  posterLink: string;
  width?: number;
  height?: number;
}

export const GoogleDrivePoster: React.FC<GoogleDrivePosterViewerProps> = ({
  posterLink,
  width = 640,
  height = 480,
}) => {
  //   const viewerUrl = `https://drive.google.com/uc?id=${fileId}`;
  const viewerUrl = posterLink;

  return (
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
  );
};

// // Usage
// const fileId = "1-y9-lcC68b3PRBU0OAOQtfLi_Y5osnxu"; // Extracted from the Google Drive link
// <GoogleDrivePoster posterLink={fileId} />;
