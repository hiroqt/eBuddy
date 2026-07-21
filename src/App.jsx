import React, { useState } from 'react'
import SignIn from './screens/SignIn'
import FaceLiveness from './screens/FaceLiveness'
import Wallet from './screens/Wallet'
import DocumentDetail from './screens/DocumentDetail'
import ShareVerify from './screens/ShareVerify'
import ActivityLog from './screens/ActivityLog'
import Profile from './screens/Profile'
import ServiceHub from './screens/ServiceHub'
import AITaskPlanner from './screens/AITaskPlanner'
import GuidedQuestions from './screens/GuidedQuestions'
import DocumentAssistant from './screens/DocumentAssistant'
import ApplicationReview from './screens/ApplicationReview'
import Payment from './screens/Payment'
import SubmissionConfirmation from './screens/SubmissionConfirmation'
import TrackingTimeline from './screens/TrackingTimeline'
import ReportConcern from './screens/ReportConcern'
import AgentChatBubble from './components/AgentChatBubble'
import Sidebar from './components/Sidebar'

function App() {
  // Check if returning from face liveness verification
  const urlParams = new URLSearchParams(window.location.search)
  const hasLivenessCallback = urlParams.has('liveness_status') && urlParams.has('token')
  
  const [currentScreen, setCurrentScreen] = useState(hasLivenessCallback ? 'face-liveness' : 'signin')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [shareTarget, setShareTarget] = useState(null)
  const [applicationData, setApplicationData] = useState({})
  const [currentService, setCurrentService] = useState(null)

  const navigate = (screen, data = null) => {
    if (data) {
      if (screen === 'document-detail') setSelectedDocument(data)
      if (screen === 'share-verify') setShareTarget(data)
      if (screen === 'service-hub' || screen === 'ai-task-planner') setCurrentService(data)
    }
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-paper-dim sm:p-5">
      {/* Responsive PWA layout - full screen on mobile, phone frame on desktop */}
      <div className="w-full h-[100dvh] sm:h-[896px] sm:max-w-[414px] bg-paper sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-hairline overflow-hidden relative flex flex-col">
        {/* Sidebar Navigation - Inside PWA */}
        <Sidebar currentScreen={currentScreen} onNavigate={navigate} />
        
        {/* Wrapper for smooth transitions */}
        <div key={currentScreen} className="animate-fadeIn w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-20 sm:pb-0">
        {currentScreen === 'signin' && <SignIn onNext={() => navigate('face-liveness')} />}
        {currentScreen === 'face-liveness' && <FaceLiveness onNext={() => navigate('service-hub')} />}
        
        {/* Service Hub - Main entry point */}
        {currentScreen === 'service-hub' && (
          <ServiceHub
            onStartService={(service) => navigate('ai-task-planner', service)}
            onNavigate={navigate}
          />
        )}
        
        {/* AI Task Planner */}
        {currentScreen === 'ai-task-planner' && (
          <AITaskPlanner
            service={currentService}
            onAccept={() => navigate('guided-questions')}
            onCancel={() => navigate('service-hub')}
          />
        )}
        
        {/* Guided Questions */}
        {currentScreen === 'guided-questions' && (
          <GuidedQuestions
            applicationId={applicationData.id}
            onComplete={(answers) => {
              setApplicationData({ ...applicationData, answers })
              navigate('document-assistant')
            }}
            onBack={() => navigate('ai-task-planner')}
            onSave={(answers) => {
              setApplicationData({ ...applicationData, answers })
              alert('Draft saved!')
            }}
          />
        )}
        
        {/* Document Assistant */}
        {currentScreen === 'document-assistant' && (
          <DocumentAssistant
            applicationId={applicationData.id}
            onComplete={(docs) => {
              setApplicationData({ ...applicationData, documents: docs })
              navigate('application-review')
            }}
            onBack={() => navigate('guided-questions')}
          />
        )}
        
        {/* Application Review */}
        {currentScreen === 'application-review' && (
          <ApplicationReview
            applicationData={applicationData}
            onConfirm={() => navigate('payment')}
            onEdit={(section) => {
              if (section === 'questions') navigate('guided-questions')
              if (section === 'documents') navigate('document-assistant')
            }}
            onBack={() => navigate('document-assistant')}
          />
        )}
        
        {/* Payment */}
        {currentScreen === 'payment' && (
          <Payment
            applicationData={applicationData}
            onSuccess={(paymentData) => {
              setApplicationData({ ...applicationData, payment: paymentData })
              navigate('submission-confirmation')
            }}
            onBack={() => navigate('application-review')}
          />
        )}
        
        {/* Submission Confirmation */}
        {currentScreen === 'submission-confirmation' && (
          <SubmissionConfirmation
            submissionData={applicationData}
            onTrackApplication={() => navigate('tracking-timeline')}
            onGoHome={() => navigate('service-hub')}
          />
        )}
        
        {/* Tracking Timeline */}
        {currentScreen === 'tracking-timeline' && (
          <TrackingTimeline
            applicationId={applicationData.id}
            onFileConcern={() => navigate('report-concern')}
            onBack={() => navigate('service-hub')}
          />
        )}
        
        {/* Report Concern */}
        {currentScreen === 'report-concern' && (
          <ReportConcern
            applicationData={applicationData}
            onSubmitted={(caseNumber) => {
              navigate('tracking-timeline')
            }}
            onBack={() => navigate('tracking-timeline')}
          />
        )}
        
        {/* Legacy screens - Wallet mode */}
        {currentScreen === 'wallet' && (
          <Wallet
            onDocumentSelect={(doc) => navigate('document-detail', doc)}
            onNavigate={navigate}
          />
        )}
        {currentScreen === 'document-detail' && (
          <DocumentDetail
            document={selectedDocument}
            onBack={() => navigate('wallet')}
            onShare={(doc) => navigate('share-verify', doc)}
          />
        )}
        {currentScreen === 'share-verify' && (
          <ShareVerify
            document={shareTarget}
            onBack={() => navigate('document-detail', selectedDocument)}
            onComplete={() => navigate('wallet')}
          />
        )}
        {currentScreen === 'activity-log' && <ActivityLog onBack={() => navigate('wallet')} />}
        {currentScreen === 'profile' && <Profile onBack={() => navigate('service-hub')} onSignOut={() => navigate('signin')} />}

        {/* AI Agent Chat Bubble - Available on most screens */}
        {currentScreen !== 'signin' && 
         currentScreen !== 'face-liveness' && 
         currentScreen !== 'ai-task-planner' &&
         currentScreen !== 'submission-confirmation' && (
          <AgentChatBubble onNavigate={navigate} userName="Juan" />
        )}
        </div>
      </div>
    </div>
  )
}

export default App
