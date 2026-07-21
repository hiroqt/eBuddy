import React, { useState } from 'react'
import { Search, Filter, Clock, Menu, User } from 'lucide-react'
import DocumentCard from '../components/DocumentCard'

const mockDocuments = [
  {
    id: 1,
    type: 'Birth Certificate',
    agency: 'Philippine Statistics Authority',
    status: 'verified',
    documentNumber: 'PSA-2024-0012345',
    dateIssued: 'January 15, 2024',
    blockchainHash: '0x7d9a8f3c2e1b5a6d4c8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c',
  },
  {
    id: 2,
    type: 'SSS UMID',
    agency: 'Social Security System',
    status: 'verified',
    documentNumber: '01-2345678-9',
    dateIssued: 'March 22, 2023',
    blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
  },
  {
    id: 3,
    type: 'PhilHealth ID',
    agency: 'Philippine Health Insurance Corporation',
    status: 'verified',
    documentNumber: '12-345678901-2',
    dateIssued: 'June 10, 2023',
    daysUntilExpiry: 25,
    blockchainHash: '0x9f8e7d6c5b4a3e2d1c0b9a8f7e6d5c4b3a2e1d0c9b8a7f6e5d4c3b2a1e0d9c8b',
  },
  {
    id: 4,
    type: "Driver's License",
    agency: 'Land Transportation Office',
    status: 'verified',
    documentNumber: 'N01-23-456789',
    dateIssued: 'September 5, 2022',
    blockchainHash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
  },
  {
    id: 5,
    type: "Voter's Certification",
    agency: 'Commission on Elections',
    status: 'verified',
    documentNumber: 'VC-2024-MNL-012345',
    dateIssued: 'February 1, 2024',
    blockchainHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
  },
  {
    id: 6,
    type: 'TIN ID',
    agency: 'Bureau of Internal Revenue',
    status: 'pending',
    documentNumber: '123-456-789-000',
    dateIssued: 'Pending verification',
    blockchainHash: null,
  },
]

export default function Wallet({ onDocumentSelect, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'verified', label: 'Verified' },
    { id: 'expiring', label: 'Expiring' },
  ]

  const filteredDocuments = mockDocuments.filter((doc) => {
    const matchesSearch =
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.agency.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === 'verified') return matchesSearch && doc.status === 'verified'
    if (activeFilter === 'expiring')
      return matchesSearch && doc.daysUntilExpiry && doc.daysUntilExpiry <= 30

    return matchesSearch
  })

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink mb-1">
              Good morning, Juan
            </h1>
            <p className="font-sans text-sm text-ink-soft">
              6 documents in your wallet
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('activity-log')}
              className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
            >
              <Clock size={20} className="text-ink" />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
            >
              <User size={20} className="text-ink" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
          />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3.5 pl-12 pr-4 rounded-xl border border-hairline bg-paper-dim font-sans text-[15px] text-ink outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full border-none font-sans text-sm font-semibold cursor-pointer transition-all duration-150 ${
                activeFilter === filter.id
                  ? 'bg-seal-blue text-paper'
                  : 'bg-paper-dim text-ink hover:bg-hairline'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document list */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-3">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onClick={() => onDocumentSelect(doc)} />
          ))}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12 px-6 text-ink-soft">
              <p className="font-sans text-[15px]">
                No documents match your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
