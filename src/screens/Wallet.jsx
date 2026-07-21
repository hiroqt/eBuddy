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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #DAD5C9',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '24px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '4px',
              }}
            >
              Good morning, Juan
            </h1>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#5B6472',
              }}
            >
              6 documents in your wallet
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onNavigate('activity-log')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F2EFE7',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Clock size={20} style={{ color: '#1B2430' }} />
            </button>
            <button
              onClick={() => onNavigate('profile')}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: '#F2EFE7',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <User size={20} style={{ color: '#1B2430' }} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#5B6472',
            }}
          />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              borderRadius: '12px',
              border: '1px solid #DAD5C9',
              background: '#F2EFE7',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '15px',
              color: '#1B2430',
            }}
          />
        </div>

        {/* Filter chips */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: 'none',
                background: activeFilter === filter.id ? '#1F3A5F' : '#F2EFE7',
                color: activeFilter === filter.id ? '#FBFAF7' : '#1B2430',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Document list */}
      <div
        className="no-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} onClick={() => onDocumentSelect(doc)} />
          ))}

          {filteredDocuments.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                color: '#5B6472',
              }}
            >
              <p style={{ fontFamily: "'Public Sans', sans-serif", fontSize: '15px' }}>
                No documents match your search
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
