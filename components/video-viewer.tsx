import React from 'react';

interface GoogleDriveVideoProps {
  videoLink: string;
  width?: number;
  height?: number;
}

export const GoogleDriveVideo: React.FC<GoogleDriveVideoProps> = ({ videoLink, width = 640, height = 640 }) => {
  const embedUrl = videoLink;

  return (
    <div className="h-screen">
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        allow="autoplay; fullscreen"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

// Usage
// const videoId = "1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU"; // Extracted from the debug info
// <GoogleDriveVideo videoLink={"1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU"} />;