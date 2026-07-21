# DocuPH - Unified Document Wallet

**Blockchain-verified digital repository for Philippine government documents.**

## 🚀 Features

### 📱 Document Management
- **Digital Wallet** - Store all your government documents in one secure place
- **Blockchain Verification** - Every document is verified on the eGov blockchain
- **Smart Search** - Quickly find any document by type or agency
- **Document Sharing** - Securely share documents with QR codes

### 🤖 AI-Powered Assistant
- **eGov AI Integration** - Real-time assistance powered by Philippine government AI
- **Smart Navigation** - Ask questions and get directed to the right place
- **Context-Aware** - Understands queries about Philippine government services
- **Always Available** - Floating chat bubble accessible from any page

### 🔐 Security Features
- **Face Liveness Verification** - Advanced biometric authentication
- **Dry Seal Technology** - Tamper-evident document verification
- **Activity Logging** - Track all document access and sharing
- **Secure QR Codes** - Time-limited document sharing

### 📊 Document Types Supported
- Birth Certificate (PSA)
- SSS UMID
- PhilHealth ID
- Driver's License (LTO)
- Voter's Certification (COMELEC)
- TIN ID (BIR)
- And more...

## 🛠️ Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **eGov AI API** - Philippine government AI services
- **PWA Support** - Install as a mobile app

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Face Liveness API
VITE_LIVENESS_API_BASE_URL=https://hackathon-face-liveness-api.e.gov.ph
VITE_LIVENESS_API_KEY=your_liveness_api_key

# eGov AI Assistant API
VITE_EGOV_API_BASE_URL=https://egov-api-staging.dict.gov.ph
VITE_EGOV_ACCESS_CODE=your_access_code_here
```

See [EGOV_AI_SETUP.md](./EGOV_AI_SETUP.md) for detailed AI integration setup.

## 🎯 Usage

### For Users

1. **Sign In** - Authenticate with eGov PH
2. **Face Verification** - Complete biometric verification
3. **Browse Documents** - View your verified documents
4. **Ask AI Assistant** - Click the floating bubble to chat
5. **Share Documents** - Generate secure QR codes

### For Developers

```javascript
// Use the eGov AI utility
import { callAIAssistant, getTokenCredits } from './utils/egovApi'

// Ask the AI a question
const response = await callAIAssistant('How do I renew my license?', 'PH')

// Check API credits
const credits = await getTokenCredits()
```

## 🤝 AI Assistant Examples

Try these queries with the AI assistant:

- "How do I get a digital TIN ID?"
- "Show me my documents"
- "What is PhilHealth?"
- "How do I renew my driver's license?"
- "What documents do I need for a business permit?"
- "Go to my profile"

## 🏗️ Project Structure

```
DocuPH/
├── src/
│   ├── components/
│   │   ├── AgentChatBubble.jsx  # AI chat interface
│   │   ├── Button.jsx
│   │   ├── DocumentCard.jsx
│   │   └── DrySealBadge.jsx
│   ├── screens/
│   │   ├── SignIn.jsx
│   │   ├── FaceLiveness.jsx
│   │   ├── Wallet.jsx           # Main document view
│   │   ├── DocumentDetail.jsx
│   │   ├── ShareVerify.jsx
│   │   ├── ActivityLog.jsx
│   │   └── Profile.jsx
│   ├── utils/
│   │   └── egovApi.js           # eGov API utilities
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── .env.example
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🔧 Development

### Adding New Features

1. **New Screen** - Add to `src/screens/` and update `App.jsx` routing
2. **New Component** - Add to `src/components/`
3. **API Integration** - Extend `src/utils/egovApi.js`

### Styling Guidelines

- Use Tailwind utilities when possible
- Follow the beige/cream design system
- Maintain accessibility (WCAG compliance)
- Test on mobile viewport (414x896)

## 🚀 Deployment

### Build Production Bundle

```bash
npm run build
```

Output: `dist/` directory

### Deploy To

- **Vercel** - Zero-config deployment
- **Netlify** - Automatic builds
- **GitHub Pages** - Static hosting
- **eGov Hosting** - Official deployment

## 📱 PWA Features

- **Offline Support** - Works without internet
- **Install Prompt** - Add to home screen
- **Fast Loading** - Service worker caching
- **Native Feel** - Standalone display mode

## 🔐 Security Notes

- Never commit `.env` file
- Tokens auto-expire after 8 hours
- Face liveness prevents spoofing
- QR codes are time-limited
- All documents blockchain-verified

## 📄 License

Built for the eGov Hackathon 2026

## 🆘 Support

- **API Issues** - Contact eGov Hackathon team
- **Documentation** - See [EGOV_AI_SETUP.md](./EGOV_AI_SETUP.md)
- **Bugs** - Check browser console logs

## 🎉 Acknowledgments

- **eGov Philippines** - API and infrastructure
- **DICT** - Hackathon support
- **Philippine Government** - Document verification system

---

Built with ❤️ for the Filipino people
