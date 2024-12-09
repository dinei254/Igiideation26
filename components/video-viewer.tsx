import React from 'react';

interface GoogleDriveVideoProps {
  fileId: string;
  width?: number;
  height?: number;
}

export const GoogleDriveVideo: React.FC<GoogleDriveVideoProps> = ({ fileId, width = 640, height = 360 }) => {
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={embedUrl}
        width={width}
        height={height}
        allow="autoplay"
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

// Usage
const videoId = "1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU"; // Extracted from the debug info
<GoogleDriveVideo fileId={"1Q_mBewWcVhYwCZpJWFmzHU3-iZIlJqQU"} />;
