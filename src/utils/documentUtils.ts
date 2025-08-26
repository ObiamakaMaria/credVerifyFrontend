// Document type definitions for utilities
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

export const exportDocumentsList = (documents: Document[], format: 'csv' | 'json' = 'csv') => {
  if (format === 'json') {
    const dataStr = JSON.stringify(documents, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `documents_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  } else {
    const csvContent = [
      ['Name', 'Type', 'Status', 'Upload Date', 'Expiry Date', 'Size', 'Description'].join(','),
      ...documents.map(doc => [
        `"${doc.name}"`,
        `"${doc.type.replace('_', ' ')}"`,
        `"${doc.status}"`,
        `"${doc.uploadDate.toLocaleDateString()}"`,
        `"${doc.expiryDate ? doc.expiryDate.toLocaleDateString() : 'No expiry'}"`,
        `"${doc.size}"`,
        `"${doc.description}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `documents_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const filterDocuments = (
  documents: Document[],
  filters: {
    searchTerm?: string;
    type?: string;
    status?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
) => {
  let filtered = documents;

  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(doc => 
      doc.name.toLowerCase().includes(term) ||
      doc.description.toLowerCase().includes(term) ||
      doc.type.toLowerCase().includes(term)
    );
  }

  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(doc => doc.type === filters.type);
  }

  if (filters.status && filters.status !== 'all') {
    filtered = filtered.filter(doc => doc.status === filters.status);
  }

  if (filters.dateRange) {
    filtered = filtered.filter(doc => 
      doc.uploadDate >= filters.dateRange!.start && 
      doc.uploadDate <= filters.dateRange!.end
    );
  }

  return filtered;
};

export const sortDocuments = (
  documents: Document[],
  sortBy: 'name' | 'uploadDate' | 'type' | 'status' | 'size',
  order: 'asc' | 'desc' = 'asc'
) => {
  return [...documents].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'uploadDate':
        comparison = a.uploadDate.getTime() - b.uploadDate.getTime();
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      case 'size':
        // Convert size to bytes for comparison
        const getSizeInBytes = (size: string) => {
          const parts = size.split(' ');
          const value = parseFloat(parts[0]);
          const unit = parts[1];
          
          switch (unit) {
            case 'KB': return value * 1024;
            case 'MB': return value * 1024 * 1024;
            case 'GB': return value * 1024 * 1024 * 1024;
            default: return value;
          }
        };
        comparison = getSizeInBytes(a.size) - getSizeInBytes(b.size);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });
};

export const getDocumentTypeColor = (type: string) => {
  switch (type) {
    case 'loan_agreement':
      return 'bg-blue-100 text-blue-800';
    case 'payment_receipt':
      return 'bg-green-100 text-green-800';
    case 'credit_report':
      return 'bg-purple-100 text-purple-800';
    case 'tax_document':
      return 'bg-yellow-100 text-yellow-800';
    case 'identity':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const validateFile = (file: File) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  
  const errors: string[] = [];

  if (file.size > maxSize) {
    errors.push('File size must be less than 10MB');
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Only PDF, JPG, JPEG, and PNG files are allowed');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
