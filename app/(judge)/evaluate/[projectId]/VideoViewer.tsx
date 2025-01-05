import React from "react";

interface GoogleDriveVideoProps {
  videoLink: string;
  width?: number;
  height?: number;
}

export const VideoViewer: React.FC<GoogleDriveVideoProps> = ({
  videoLink,
  width = 640,
  height = 640,
}) => {
  const embedUrl = videoLink;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Uploaded Videos</h2>
      <div className="h-screen">
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          allow="autoplay; fullscreen"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
};
