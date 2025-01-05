function modifyGoogleDriveLink(url : string) {
    const cleanedURL = url.split('/view')[0]; // Removes everything from '/view' onwards
    return `${cleanedURL}/preview`;
  }

export default modifyGoogleDriveLink
