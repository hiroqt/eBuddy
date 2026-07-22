import { useState, useEffect } from 'react'
import { ApplicationId } from '@/shared/types'

// Import screens (will be migrated to features/)
import SignIn from '../screens/SignIn'
import FaceLiveness from '../screens/FaceLiveness'
import ServiceHub from '../screens/ServiceHub'
import AITaskPlanner from '../screens/AITaskPlanner'
import GuidedQuestions from '../screens/GuidedQuestions'
import DocumentAssistant from '../screens/DocumentAssistant'
import ApplicationReview from '../screens/ApplicationReview'
import Payment from '../screens/Payment'
import SubmissionConfirmation from '../screens/SubmissionConfirmation'
import TrackingTimeline from '../screens/TrackingTimeline'
import ReportConcern from '../screens/ReportConcern'
import Wallet from '../screens/Wallet'
import DocumentDetail from '../screens/DocumentDetail'
import ShareVerify from '../screens/ShareVerify'
import ActivityLog from '../screens/ActivityLog'
import Profile from '../screens/Profile'

// Import components
import AgentChatBubble from '../components/AgentChatBubble'
import Sidebar from '../components/Sidebar'

export type ScreenName =
  | 'signin'
  | 'face-liveness'
  | 'service-hub'
  | 'ai-task-planner'
  | 'guided-questions'
  | 'document-assistant'
  | 'application-review'
  | 'payment'
  | 'submission-confirmation'
  | 'tracking-timeline'
  | 'report-concern'
  | 'wallet'
  | 'document-detail'
  | 'share-verify'
  | 'activity-log'
  | 'profile'

interface ApplicationData {
  id?: ApplicationId
  answers?: Record<string, unknown>
  documents?: string[]
  payment?: unknown
  [key: string]: unknown
}

interface NavigationData {
  serviceId?: string
  documentId?: string
  applicationId?: ApplicationId
  [key: string]: unknown
}

function App() {
  // Check if returning from face liveness verification
  const urlParams = new URLSearchParams(window.location.search)
  const hasLivenessCallback = urlParams.has('liveness_status') && urlParams.has('token')

  const [currentScreen, setCurrentScreen] = useState<ScreenName>(
    hasLivenessCallback ? 'face-liveness' : 'signin'
  )
  const [selectedDocument, setSelectedDocument] = useState<unknown>(null)
  const [shareTarget, setShareTarget] = useState<unknown>(null)
  const [applicationData, setApplicationData] = useState<ApplicationData>({})
  const [currentService, setCurrentService] = useState<unknown>(null)

  // Clear URL params after processing
  useEffect(() => {
    if (hasLivenessCallback) {
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [hasLivenessCallback])

  const navigate = (screen: ScreenName, data?: NavigationData) => {
    if (data) {
      if (screen === 'document-detail') setSelectedDocument(data)
      if (screen === 'share-verify') setShareTarget(data)
      if (screen === 'service-hub' || screen === 'ai-task-planner') setCurrentService(data)
    }
    setCurrentScreen(screen)
  }

  // Screens where Agent Chat Bubble should NOT appear
  const hideAgentScreens: ScreenName[] = [
    'signin',
    'face-liveness',
    'ai-task-planner',
    'submission-confirmation',
  ]

  const showAgentBubble = !hideAgentScreens.includes(currentScreen)

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-paper-dim p-0 sm:p-5">
      {/* Responsive PWA layout - full screen on mobile, frame on desktop */}
      <div className="w-full h-[100dvh] sm:h-[896px] sm:max-w-[414px] sm:min-w-[375px] md:max-w-[768px] lg:max-w-[1024px] bg-paper sm:rounded-[40px] sm:shadow-2xl sm:border sm:border-hairline overflow-hidden relative flex flex-col">
        {/* Sidebar Navigation */}
        <Sidebar currentScreen={currentScreen} onNavigate={navigate} />

        {/* Main content wrapper with animation */}
        <div
          key={currentScreen}
          className="animate-fadeIn w-full h-full flex flex-col overflow-y-auto no-scrollbar pb-20 sm:pb-0"
        >
          {/* Auth Screens */}
          {currentScreen === 'signin' && <SignIn onNext={() => navigate('face-liveness')} />}
          {currentScreen === 'face-liveness' && (
            <FaceLiveness onNext={() => navigate('service-hub')} />
          )}

          {/* Service Hub - Main entry */}
          {currentScreen === 'service-hub' && (
            <ServiceHub
              onStartService={(service: unknown) => navigate('ai-task-planner', { service })}
              onNavigate={navigate}
            />
          )}

          {/* Service Flow */}
          {currentScreen === 'ai-task-planner' && (
            <AITaskPlanner
              service={currentService}
              onAccept={() => navigate('guided-questions')}
              onCancel={() => navigate('service-hub')}
            />
          )}

          {currentScreen === 'guided-questions' && (
            <GuidedQuestions
              applicationId={applicationData.id}
              onComplete={(answers: Record<string, unknown>) => {
                setApplicationData({ ...applicationData, answers })
                navigate('document-assistant')
              }}
              onBack={() => navigate('ai-task-planner')}
              onSave={(answers: Record<string, unknown>) => {
                setApplicationData({ ...applicationData, answers })
                alert('Draft saved!')
              }}
            />
          )}

          {currentScreen === 'document-assistant' && (
            <DocumentAssistant
              applicationId={applicationData.id}
              onComplete={(docs: string[]) => {
                setApplicationData({ ...applicationData, documents: docs })
                navigate('application-review')
              }}
              onBack={() => navigate('guided-questions')}
            />
          )}

          {currentScreen === 'application-review' && (
            <ApplicationReview
              applicationData={applicationData}
              onConfirm={() => navigate('payment')}
              onEdit={(section: string) => {
                if (section === 'questions') navigate('guided-questions')
                if (section === 'documents') navigate('document-assistant')
              }}
              onBack={() => navigate('document-assistant')}
            />
          )}

          {currentScreen === 'payment' && (
            <Payment
              applicationData={applicationData}
              onSuccess={(paymentData: unknown) => {
                setApplicationData({ ...applicationData, payment: paymentData })
                navigate('submission-confirmation')
              }}
              onBack={() => navigate('application-review')}
            />
          )}

          {currentScreen === 'submission-confirmation' && (
            <SubmissionConfirmation
              submissionData={applicationData}
              onTrackApplication={() => navigate('tracking-timeline')}
              onGoHome={() => navigate('service-hub')}
            />
          )}

          {currentScreen === 'tracking-timeline' && (
            <TrackingTimeline
              applicationId={applicationData.id}
              onFileConcern={() => navigate('report-concern')}
              onBack={() => navigate('service-hub')}
            />
          )}

          {currentScreen === 'report-concern' && (
            <ReportConcern
              applicationData={applicationData}
              onSubmitted={() => navigate('tracking-timeline')}
              onBack={() => navigate('tracking-timeline')}
            />
          )}

          {/* Wallet Screens */}
          {currentScreen === 'wallet' && (
            <Wallet
              onDocumentSelect={(doc: unknown) => navigate('document-detail', { doc })}
              onNavigate={navigate}
            />
          )}

          {currentScreen === 'document-detail' && (
            <DocumentDetail
              document={selectedDocument}
              onBack={() => navigate('wallet')}
              onShare={(doc: unknown) => navigate('share-verify', { doc })}
            />
          )}

          {currentScreen === 'share-verify' && (
            <ShareVerify
              document={shareTarget}
              onBack={() => navigate('document-detail', { doc: selectedDocument })}
              onComplete={() => navigate('wallet')}
            />
          )}

          {/* Profile & Activity */}
          {currentScreen === 'activity-log' && <ActivityLog onBack={() => navigate('wallet')} />}

          {currentScreen === 'profile' && (
            <Profile onBack={() => navigate('service-hub')} onSignOut={() => navigate('signin')} />
          )}

          {/* AI Agent Chat Bubble */}
          {showAgentBubble && <AgentChatBubble onNavigate={navigate} userName="Juan" />}
        </div>
      </div>
    </div>
  )
}

export default App
