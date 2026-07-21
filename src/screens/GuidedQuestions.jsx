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

  const optionBtnClass = (isSelected) =>
    `w-full p-[18px] rounded-xl border-2 font-sans text-base font-semibold text-ink cursor-pointer transition-all duration-150 text-left ${
      isSelected
        ? 'border-seal-blue bg-paper-dim'
        : 'border-hairline bg-paper hover:border-ink-soft/40'
    }`

  return (
    <div className="h-full flex flex-col bg-paper">
      {/* Header */}
      <div className="px-6 py-5 border-b border-hairline">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={handleBack}
            className="w-10 h-10 rounded-[10px] bg-paper-dim border-none flex items-center justify-center cursor-pointer transition-all duration-150 hover:shadow-md"
          >
            <ArrowLeft size={20} className="text-ink" />
          </button>
          <div className="flex-1">
            <h2 className="font-display text-xl font-semibold text-ink mb-1">
              A few questions
            </h2>
            <p className="font-sans text-[13px] text-ink-soft">
              Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </p>
          </div>
          <button
            onClick={handleSaveDraft}
            className="px-3 py-2 rounded-lg bg-paper-dim border-none flex items-center gap-1.5 cursor-pointer font-sans text-[13px] font-semibold text-ink transition-all duration-150 hover:shadow-md"
          >
            <Save size={16} />
            Save
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full bg-paper-dim overflow-hidden">
          <div
            className="h-full bg-seal-blue transition-[width] duration-300 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-6">
        {/* Mascot helper */}
        <div className="bg-amber-tint border border-amber-line rounded-2xl p-4 mb-6 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-bronze flex items-center justify-center shrink-0 font-display text-2xl font-bold text-paper">
            e
          </div>
          <div>
            <p className="font-sans text-sm text-ink leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="font-display text-[22px] font-semibold text-ink mb-6 leading-tight">
            {currentQuestion.label}
          </h3>

          {/* Boolean question */}
          {currentQuestion.type === 'boolean' && (
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleAnswer(currentQuestion.id, true)}
                className={optionBtnClass(answers[currentQuestion.id] === true)}
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(currentQuestion.id, false)}
                className={optionBtnClass(answers[currentQuestion.id] === false)}
              >
                No
              </button>
            </div>
          )}

          {/* Single select question */}
          {currentQuestion.type === 'single-select' && (
            <div className="flex flex-col gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value)}
                  className={optionBtnClass(answers[currentQuestion.id] === option.value)}
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
              className="w-full p-[18px] rounded-xl border-2 border-hairline bg-paper font-sans text-base text-ink outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60"
            />
          )}

          {/* Number question */}
          {currentQuestion.type === 'number' && (
            <input
              type="number"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
              placeholder={currentQuestion.placeholder}
              className="w-full p-[18px] rounded-xl border-2 border-hairline bg-paper font-sans text-base text-ink outline-none focus:border-seal-blue transition-colors duration-150 placeholder:text-ink-soft/60"
            />
          )}
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="px-6 py-5 border-t border-hairline">
        <Button fullWidth onClick={handleNext} disabled={!canGoNext} icon={ArrowRight}>
          {isLastQuestion ? 'Continue to documents' : 'Next question'}
        </Button>
      </div>
    </div>
  )
}
