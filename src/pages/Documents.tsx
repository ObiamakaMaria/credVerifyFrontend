import React, { useState, useEffect } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import DocumentViewer from '../components/documents/DocumentViewer';
import DocumentUpload from '../components/documents/DocumentUpload';
import DocumentCard from '../components/documents/DocumentCard';
import { 
  FileText, 
  Download, 
  Eye, 
  Upload, 
  Search, 
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Plus,
  Grid,
  List
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'loan_agreement' | 'payment_receipt' | 'credit_report' | 'tax_document' | 'identity' | 'other';
  status: 'verified' | 'pending' | 'expired' | 'rejected';
  uploadDate: Date;
  expiryDate?: Date;
  size: string;
  description: string;
  downloadUrl?: string;
}

const Documents: React.FC = () => {
  const { address, isConnected } = useAppKitAccount();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Mock documents data
  useEffect(() => {
    if (isConnected && address) {
      // Simulate loading documents
      setTimeout(() => {
        const mockDocuments: Document[] = [
          {
            id: '1',
            name: 'Credit Builder Loan Agreement.pdf',
            type: 'loan_agreement',
            status: 'verified',
            uploadDate: new Date('2024-01-15'),
            size: '2.4 MB',
            description: 'Official loan agreement for credit builder loan',
            downloadUrl: '#'
          },
          {
            id: '2',
            name: 'Payment Receipt - January 2024.pdf',
            type: 'payment_receipt',
            status: 'verified',
            uploadDate: new Date('2024-01-31'),
            size: '156 KB',
            description: 'Monthly payment receipt for January 2024',
            downloadUrl: '#'
          },
          {
            id: '3',
            name: 'Credit Report - Q1 2024.pdf',
            type: 'credit_report',
            status: 'verified',
            uploadDate: new Date('2024-03-01'),
            expiryDate: new Date('2024-06-01'),
            size: '892 KB',
            description: 'Quarterly credit report showing score improvements',
            downloadUrl: '#'
          },
          {
            id: '4',
            name: 'Tax Document 2023.pdf',
            type: 'tax_document',
            status: 'pending',
            uploadDate: new Date('2024-02-10'),
            expiryDate: new Date('2025-04-15'),
            size: '1.1 MB',
            description: 'Annual tax document for verification',
            downloadUrl: '#'
          },
          {
            id: '5',
            name: 'Government ID.pdf',
            type: 'identity',
            status: 'expired',
            uploadDate: new Date('2023-06-15'),
            expiryDate: new Date('2024-06-15'),
            size: '678 KB',
            description: 'Government issued identification document',
            downloadUrl: '#'
          }
        ];
        setDocuments(mockDocuments);
        setFilteredDocuments(mockDocuments);
        setIsLoading(false);
      }, 1000);
    }
  }, [isConnected, address]);

  // Filter documents based on search and filters
  useEffect(() => {
    let filtered = documents;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(doc => doc.type === selectedType);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === selectedStatus);
    }

    setFilteredDocuments(filtered);
  }, [searchTerm, selectedType, selectedStatus, documents]);

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

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleDownload = (doc: Document) => {
    // In a real app, this would trigger actual download
    console.log('Downloading:', doc.name);
  };

  const handleView = (doc: Document) => {
    setSelectedDocument(doc);
    setShowViewer(true);
  };

  const handleUploadFile = async (file: File, type: string, description: string) => {
    // Simulate upload process
    console.log('Uploading file:', file.name, 'Type:', type, 'Description:', description);
    
    // In a real app, you would upload to your backend here
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: type as any,
      status: 'pending',
      uploadDate: new Date(),
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      description: description || `Uploaded ${file.name}`,
    };

    setDocuments(prev => [newDocument, ...prev]);
  };

  const handleDelete = (docId: string) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400">Please connect your wallet to view your documents.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Documents</h1>
          <p className="text-gray-400">Manage and access all your credit-related documents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Documents</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Verified</p>
                <p className="text-2xl font-bold text-green-500">
                  {documents.filter(doc => doc.status === 'verified').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {documents.filter(doc => doc.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Expiring Soon</p>
                <p className="text-2xl font-bold text-red-500">
                  {documents.filter(doc => 
                    doc.expiryDate && doc.expiryDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                  ).length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="loan_agreement">Loan Agreements</option>
              <option value="payment_receipt">Payment Receipts</option>
              <option value="credit_report">Credit Reports</option>
              <option value="tax_document">Tax Documents</option>
              <option value="identity">Identity Documents</option>
              <option value="other">Other</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
              <option value="rejected">Rejected</option>
            </select>

            {/* View Toggle */}
            <div className="flex bg-gray-700 rounded-md p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
            >
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>

        {/* Documents List */}
        {isLoading ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading documents...</p>
          </div>
        ) : filteredDocuments.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Documents Found</h3>
            <p className="text-gray-400 mb-4">
              {documents.length === 0 
                ? "You haven't uploaded any documents yet." 
                : "No documents match your current filters."}
            </p>
            {documents.length === 0 && (
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200 mx-auto"
              >
                <Plus className="w-4 h-4" />
                Upload Your First Document
              </button>
            )}
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onView={handleView}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{getTypeIcon(doc.type)}</span>
                          <div>
                            <div className="text-sm font-medium text-white">{doc.name}</div>
                            <div className="text-sm text-gray-400">{doc.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300 capitalize">
                          {doc.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(doc.status)}
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                            {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(doc.uploadDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {doc.expiryDate ? formatDate(doc.expiryDate) : 'No expiry'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleView(doc)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-gray-600 rounded-md transition-colors"
                            title="View document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(doc)}
                            className="p-2 text-green-400 hover:text-green-300 hover:bg-gray-600 rounded-md transition-colors"
                            title="Download document"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(doc.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-600 rounded-md transition-colors"
                            title="Delete document"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        <DocumentUpload
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUploadFile}
        />

        {/* Document Viewer */}
        <DocumentViewer
          isOpen={showViewer}
          onClose={() => setShowViewer(false)}
          document={selectedDocument}
        />
      </div>
    </div>
  );
};

export default Documents;
