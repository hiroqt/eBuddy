# DocuPH — Unified Document Wallet

Blockchain-verified digital repository for Philippine government documents with AI-powered service assistance.

## 🚀 Features

- **AI-Powered Service Agent**: Natural language interaction for government services
- **Document Wallet**: Secure storage and management of government documents
- **Identity Verification**: Integration with National ID eVerify and Face Liveness
- **Service Workflows**: Guided process for business permits, applications, and more
- **Payment Integration**: eGov Pay for government fees
- **Blockchain Verification**: Transaction proof via eGov Chain
- **Progressive Web App**: Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Integration**: eGov APIs (AI Assistant, eVerify, Face Liveness, eMessage, ePay, eChain)
- **PWA**: Service Workers for offline support

## 📁 Project Structure

```
DocuPH/
├── src/
│   ├── app/                    # Application layer
│   │   └── App.tsx            # Main app component
│   ├── features/              # Feature modules (to be organized)
│   ├── shared/                # Shared resources
│   │   ├── components/        # Reusable UI components
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility functions
│   ├── infrastructure/        # External integrations
│   │   └── api/              # API clients
│   ├── components/           # Legacy components (being migrated)
│   ├── screens/              # Screen components (being migrated)
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── public/                    # Static assets
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your API keys to .env
```

### Development

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build

```bash
# Type check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design System

### Colors

- **Primary**: Government Blue (#1F3A5F)
- **Secondary**: Bronze (#9C7A34)
- **Background**: Paper (#FBFAF7)
- **Text**: Ink (#1B2430)

### Typography

- **Display**: Fraunces (headings)
- **Body**: Public Sans (readable text)
- **Mono**: IBM Plex Mono (codes, references)

### Responsive Breakpoints

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px (sm, md)
- **Desktop**: 1024px+ (lg, xl, 2xl)

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
npm run lint         # Lint code with ESLint
npm run format       # Format code with Prettier
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Face Liveness API
VITE_LIVENESS_API_BASE_URL=https://hackathon-face-liveness-api.e.gov.ph
VITE_LIVENESS_API_KEY=your_api_key_here

# eGov AI Core API
VITE_EGOV_API_BASE_URL=https://egov-ai-core-ws.oueg.info
VITE_EGOV_ACCESS_CODE=your_access_code_here
```

## 🔐 Security

- Secure token management with automatic refresh
- Client-side encryption for sensitive data
- HTTPS-only API communications
- No sensitive data in localStorage (uses secure session storage)

## 📱 PWA Features

- Offline support
- Install as app on mobile devices
- Push notifications (via eMessage)
- Auto-update on new versions

## 🎯 Key User Flows

1. **Sign In** → Face Liveness → Service Hub
2. **Service Application** → Questions → Documents → Review → Payment → Submit
3. **Document Management** → Wallet → View → Share → Verify
4. **Track Application** → Timeline → Updates → Reports

## 🤝 Contributing

This is a hackathon project. For production use, ensure:

- Complete TypeScript migration of all components
- Comprehensive testing (unit, integration, e2e)
- Security audit
- Accessibility compliance (WCAG 2.1 AA)
- Performance optimization

## 📄 License

Proprietary - Philippine Government eGov Hackathon Project

## 🙏 Acknowledgments

- eGov Philippines for API integrations
- Anthropic Claude for AI assistance in development
- Open source community for excellent tools

---

**Built with ❤️ for the Filipino people**
