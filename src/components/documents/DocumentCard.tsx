import React from 'react';
import { FileText, Download, Eye, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'loan_agreement' | 'payment_receipt' | 'credit_report' | 'tax_document' | 'identity' | 'other';
  status: 'verified' | 'pending' | 'expired' | 'rejected';
  uploadDate: Date;
  expiryDate?: Date;
  size: string;
  description: string;
}

interface DocumentCardProps {
  document: Document;
  onView: (doc: Document) => void;
  onDownload: (doc: Document) => void;
  onDelete: (docId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onView, onDownload, onDelete }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'expired':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'loan_agreement':
        return '📄';
      case 'payment_receipt':
        return '🧾';
      case 'credit_report':
        return '📊';
      case 'tax_document':
        return '🧾';
      case 'identity':
        return '🆔';
      default:
        return '📁';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{getTypeIcon(document.type)}</span>
          <div>
            <h3 className="text-white font-medium">{document.name}</h3>
            <p className="text-gray-400 text-sm">{document.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(document.status)}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
            {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
        <span>Uploaded: {formatDate(document.uploadDate)}</span>
        <span>{document.size}</span>
      </div>

      {document.expiryDate && (
        <div className="text-sm text-gray-400 mb-3">
          Expires: {formatDate(document.expiryDate)}
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400 capitalize">
          {document.type.replace('_', ' ')}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onView(document)}
            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-700 rounded-md transition-colors"
            title="View document"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDownload(document)}
            className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-700 rounded-md transition-colors"
            title="Download document"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(document.id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors"
            title="Delete document"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
