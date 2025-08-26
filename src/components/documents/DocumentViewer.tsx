import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  document: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: Date;
    downloadUrl?: string;
  } | null;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ isOpen, onClose, document }) => {
  if (!isOpen || !document) return null;

  const handleDownload = () => {
    // In a real app, this would trigger actual download
    console.log('Downloading:', document.name);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-white">{document.name}</h3>
              <p className="text-sm text-gray-400">
                {document.size} • Uploaded {document.uploadDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="bg-gray-700 rounded-lg h-full flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Document Preview</h4>
              <p className="text-gray-400 mb-4">
                Document preview would be displayed here in a real application.
              </p>
              <p className="text-sm text-gray-500">
                In a production environment, this would show:
                <br />
                • PDF documents with embedded viewer
                <br />
                • Image documents with zoom functionality
                <br />
                • Text documents with syntax highlighting
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
