import React, { useState } from 'react'

export function DocumentUploader() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      console.log('Uploading file:', uploadedFile.name);
      // Add upload logic here
    }
  };

  return (
    <div className="document-uploader-container">
      <div className="uploader-header">
        <h2 className="uploader-title">Document Scanner</h2>
        <p className="uploader-subtitle">Upload and view your documents</p>
      </div>

      <div className="uploader-content">
        <form onSubmit={handleUpload} className="uploader-form">
          <div className="file-input-wrapper">
            <input 
              type="file" 
              id="file-input"
              className="file-input"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            />
            <label htmlFor="file-input" className="file-input-label">
              <span>Choose a file or drag and drop</span>
            </label>
          </div>

          {uploadedFile && (
            <div className="file-info">
              <p className="file-name">Selected: {uploadedFile.name}</p>
              <p className="file-size">({(uploadedFile.size / 1024).toFixed(2)} KB)</p>
            </div>
          )}

          <button type="submit" className="upload-button" disabled={!uploadedFile}>
            Upload Document
          </button>
        </form>

        <div className="document-display">
          {uploadedFile ? (
            <p className="document-preview-text">Document preview will appear here</p>
          ) : (
            <p className="empty-state">No document uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
