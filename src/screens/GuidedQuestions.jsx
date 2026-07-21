import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Save } from 'lucide-react'
import Button from '../components/Button'

const mockQuestions = [
  {
    id: 'businessNameChanged',
    type: 'boolean',
    label: 'Has your business name changed?',
    explanation: 'We need to know if you are using the same registered business name.',
  },
  {
    id: 'premisesType',
    type: 'single-select',
    label: 'Do you own or rent the business location?',
    explanation: 'Different documents are required depending on whether you own or rent.',
    options: [
      { value: 'owned', label: 'I own the property' },
      { value: 'rented', label: 'I rent the property' },
    ],
  },
  {
    id: 'businessAddress',
    type: 'text',
    label: 'What is your business address?',
    explanation: 'Provide the complete address where your business operates.',
    placeholder: 'Street, Barangay, City',
  },
  {
    id: 'numberOfEmployees',
    type: 'number',
    label: 'How many employees do you have?',
    explanation: 'Include all full-time and part-time employees.',
    placeholder: '0',
  },
]

export default function GuidedQuestions({ applicationId, onComplete, onBack, onSave }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const currentQuestion = mockQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / mockQuestions.length) * 100
  const canGoNext = answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== ''
  const isLastQuestion = currentQuestionIndex === mockQuestions.length - 1

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    } else {
      onBack()
    }
  }

  const handleSaveDraft = () => {
    onSave(answers)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FBFAF7' }}>
      {/* Header */}
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #DAD5C9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <button
            onClick={handleBack}
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
            <ArrowLeft size={20} style={{ color: '#1B2430' }} />
          </button>
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '20px',
                fontWeight: 600,
                color: '#1B2430',
                marginBottom: '4px',
              }}
            >
              A few questions
            </h2>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '13px',
                color: '#5B6472',
              }}
            >
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </p>
          </div>
          <button
            onClick={handleSaveDraft}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: '#F2EFE7',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              fontFamily: "'Public Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              color: '#1B2430',
            }}
          >
            <Save size={16} />
            Save
          </button>
        </div>

        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: '#E7E3D8',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              background: '#1F3A5F',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="no-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        {/* Mascot helper */}
        <div
          style={{
            background: '#FEF7E6',
            border: '1px solid #F5D485',
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#9C7A34',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: "'Fraunces', serif",
              fontSize: '24px',
              fontWeight: 700,
              color: '#FBFAF7',
            }}
          >
            e
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '14px',
                color: '#1B2430',
                lineHeight: 1.6,
              }}
            >
              {currentQuestion.explanation}
            </p>
          </div>
        </div>

        {/* Question */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '22px',
              fontWeight: 600,
              color: '#1B2430',
              marginBottom: '24px',
              lineHeight: 1.3,
            }}
          >
            {currentQuestion.label}
          </h3>

          {/* Boolean question */}
          {currentQuestion.type === 'boolean' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={() => handleAnswer(currentQuestion.id, true)}
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  border: `2px solid ${answers[currentQuestion.id] === true ? '#1F3A5F' : '#DAD5C9'}`,
                  background: answers[currentQuestion.id] === true ? '#F2EFE7' : '#FBFAF7',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1B2430',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(currentQuestion.id, false)}
                style={{
                  padding: '18px',
                  borderRadius: '12px',
                  border: `2px solid ${answers[currentQuestion.id] === false ? '#1F3A5F' : '#DAD5C9'}`,
                  background: answers[currentQuestion.id] === false ? '#F2EFE7' : '#FBFAF7',
                  fontFamily: "'Public Sans', sans-serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1B2430',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                No
              </button>
            </div>
          )}

          {/* Single select question */}
          {currentQuestion.type === 'single-select' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  style={{
                    padding: '18px',
                    borderRadius: '12px',
                    border: `2px solid ${answers[currentQuestion.id] === option.value ? '#1F3A5F' : '#DAD5C9'}`,
                    background:
                      answers[currentQuestion.id] === option.value ? '#F2EFE7' : '#FBFAF7',
                    fontFamily: "'Public Sans', sans-serif",
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1B2430',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Text question */}
          {currentQuestion.type === 'text' && (
            <input
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '12px',
                border: '2px solid #DAD5C9',
                background: '#FBFAF7',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '16px',
                color: '#1B2430',
              }}
            />
          )}

          {/* Number question */}
          {currentQuestion.type === 'number' && (
            <input
              type="number"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '12px',
                border: '2px solid #DAD5C9',
                background: '#FBFAF7',
                fontFamily: "'Public Sans', sans-serif",
                fontSize: '16px',
                color: '#1B2430',
              }}
            />
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div
        style={{
          padding: '20px 24px',
          borderTop: '1px solid #DAD5C9',
        }}
      >
        <Button fullWidth onClick={handleNext} disabled={!canGoNext} icon={ArrowRight}>
          {isLastQuestion ? 'Continue to documents' : 'Next question'}
        </Button>
      </div>
    </div>
  )
}
