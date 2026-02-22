import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    ChevronLeft,
    Briefcase,
    User,
    TrendingUp,
    Target,
} from 'lucide-react'
import { TypingAnimation } from './TypingAnimation'
import { TikTokEmbed } from './TiktokEmbeded'
import { useWaitlist } from '../../hooks/useWaitlist'
import { RoleAutocomplete } from './RoleAutocomplete'

interface WaitlistModalProps {
    isOpen: boolean
    onClose: () => void
    userId: string | number | null
}
const levels = [
    {
        value: 'Intern',
        icon: '🌱',
        label: 'Intern',
        description: 'Starting your career',
    },
    {
        value: 'Junior',
        icon: '🚀',
        label: 'Junior',
        description: '0-2 years experience',
    },
    {
        value: 'Mid-level',
        icon: '💼',
        label: 'Mid-level',
        description: '3-5 years experience',
    },
    {
        value: 'Senior',
        icon: '⭐',
        label: 'Senior',
        description: '5+ years experience',
    },
    {
        value: 'Lead',
        icon: '👑',
        label: 'Lead',
        description: 'Leadership role',
    },
]
const targetAreas = [
    'Communication',
    'Technical Skills',
    'Confidence',
    'Body Language',
    'STAR Method',
    'Problem Solving',
]
export function WaitlistModal({ isOpen, onClose, userId }: WaitlistModalProps) {
    const {
        data,
        updateData,
        currentStep,
        nextStep,
        prevStep,
        isStepValid,
        submitToDatabase
    } = useWaitlist(userId)

    const [roleInput, setRoleInput] = useState(data.role)

    const totalSteps = data.hasInterviewExperience !== false ? 6 : 5
    const actualStep =
        data.hasInterviewExperience === false && currentStep >= 3
            ? currentStep + 1
            : currentStep
    const handleNext = async () => {
        if (currentStep === 3 && data.hasInterviewExperience) {
            // Submit to database after collecting all info
            await submitToDatabase()
        }
        if (currentStep === 2 && data.hasInterviewExperience === false) {
            // Skip target areas step if no interview experience
            await submitToDatabase()
        }
        nextStep()
    }
    const handleTypingComplete = () => {
        nextStep()
    }
    const handleRoleSelect = (normalizedRole: string) => {
        setRoleInput(normalizedRole)
        updateData({ role: normalizedRole })
    }
    const toggleTargetArea = (area: string) => {
        const newAreas = data.targetAreas.includes(area)
            ? data.targetAreas.filter((a: string) => a !== area)
            : [...data.targetAreas, area]
        updateData({
            targetAreas: newAreas,
        })
    }
    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <motion.div
                        key="step-0"
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -20,
                        }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <Briefcase className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                                What role are you interviewing for?
                            </h3>
                            <p className="text-neutral-600">
                                Help us personalize your practice experience
                            </p>
                        </div>

                        <RoleAutocomplete
                            value={roleInput}
                            onChange={(val) => {
                                setRoleInput(val)
                                if (val !== data.role) {
                                    updateData({ role: '' })
                                }
                            }}
                            onSelect={handleRoleSelect}
                        />
                    </motion.div>
                )
            case 1:
                return (
                    <motion.div
                        key="step-1"
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -20,
                        }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <TrendingUp className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                                What level are you aiming for?
                            </h3>
                            <p className="text-neutral-600">
                                This helps us match the interview difficulty
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {levels.map((level) => (
                                <label
                                    key={level.value}
                                    className="relative cursor-pointer group"
                                >
                                    <input
                                        type="radio"
                                        name="level"
                                        value={level.value}
                                        checked={data.level === level.value}
                                        onChange={(e) =>
                                            updateData({
                                                level: e.target.value as any,
                                            })
                                        }
                                        className="sr-only"
                                    />
                                    <div
                                        className={`p-4 border-2 rounded-lg transition-all ${data.level === level.value ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-3xl">{level.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-semibold text-neutral-900">
                                                    {level.label}
                                                </div>
                                                <div className="text-sm text-neutral-600">
                                                    {level.description}
                                                </div>
                                            </div>
                                            {data.level === level.value && (
                                                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <svg
                                                        className="w-3 h-3 text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={3}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )
            case 2:
                return (
                    <motion.div
                        key="step-2"
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -20,
                        }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <User className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                                Have you been in an interview before?
                            </h3>
                            <p className="text-neutral-600">
                                This helps us understand your experience level
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label className="relative cursor-pointer group block">
                                <input
                                    type="radio"
                                    name="experience"
                                    checked={data.hasInterviewExperience === true}
                                    onChange={() =>
                                        updateData({
                                            hasInterviewExperience: true,
                                        })
                                    }
                                    className="sr-only"
                                />
                                <div
                                    className={`p-5 border-2 rounded-lg transition-all ${data.hasInterviewExperience === true ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">✅</span>
                                            <div>
                                                <div className="font-semibold text-neutral-900">
                                                    Yes, I have
                                                </div>
                                                <div className="text-sm text-neutral-600">
                                                    I want to improve my skills
                                                </div>
                                            </div>
                                        </div>
                                        {data.hasInterviewExperience === true && (
                                            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>

                            <label className="relative cursor-pointer group block">
                                <input
                                    type="radio"
                                    name="experience"
                                    checked={data.hasInterviewExperience === false}
                                    onChange={() =>
                                        updateData({
                                            hasInterviewExperience: false,
                                        })
                                    }
                                    className="sr-only"
                                />
                                <div
                                    className={`p-5 border-2 rounded-lg transition-all ${data.hasInterviewExperience === false ? 'border-primary-500 bg-primary-50 shadow-md' : 'border-neutral-200 bg-white hover:border-primary-300 hover:shadow-sm'}`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">🌟</span>
                                            <div>
                                                <div className="font-semibold text-neutral-900">
                                                    No, this is my first time
                                                </div>
                                                <div className="text-sm text-neutral-600">
                                                    I'm preparing for my first interview
                                                </div>
                                            </div>
                                        </div>
                                        {data.hasInterviewExperience === false && (
                                            <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg
                                                    className="w-3 h-3 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={3}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </motion.div>
                )
            case 3:
                if (!data.hasInterviewExperience) {
                    return null
                }
                return (
                    <motion.div
                        key="step-3"
                        initial={{
                            opacity: 0,
                            x: 20,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                        }}
                        exit={{
                            opacity: 0,
                            x: -20,
                        }}
                        className="space-y-6"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                                <Target className="w-8 h-8 text-primary-600" />
                            </div>
                            <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                                What areas do you want to improve?
                            </h3>
                            <p className="text-neutral-600">Select all that apply</p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {targetAreas.map((area) => (
                                <label key={area} className="cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.targetAreas.includes(area)}
                                        onChange={() => toggleTargetArea(area)}
                                        className="sr-only"
                                    />
                                    <div
                                        className={`px-5 py-3 rounded-full font-semibold transition-all ${data.targetAreas.includes(area) ? 'bg-primary-500 text-white shadow-md' : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-primary-300'}`}
                                    >
                                        {area}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )
            case 4: {
                const personalizedText = `Based on your goal to become a ${data.level} ${data.role}, Prep Mirrors will generate realistic mock interview scenarios tailored to your experience.${data.targetAreas.length > 0 ? `\n\nSince you want to focus on ${data.targetAreas.join(', ')}, our AI will specifically analyze your performance in these areas.` : ''}\n\nJust relax, we're building the perfect practice environment for you.`
                return (
                    <TypingAnimation
                        text={personalizedText}
                        onComplete={handleTypingComplete}
                    />
                )
            }
            case 5:
                return <TikTokEmbed onDone={onClose} />
            default:
                return null
        }
    }
    const showBackButton = currentStep > 0 && currentStep < 4
    const showNextButton = currentStep < 4
    const canProceed = isStepValid(currentStep)
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="min-h-full flex items-center justify-center p-4">
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.95,
                                    y: 20,
                                }}
                                className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative"
                            >
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors z-10"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Progress indicator */}
                                <div className="flex items-center justify-center gap-2 pt-6 pb-4">
                                    {Array.from({
                                        length: totalSteps,
                                    }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-2 rounded-full transition-all ${index === actualStep ? 'w-8 bg-primary-500' : index < actualStep ? 'w-2 bg-primary-300' : 'w-2 bg-neutral-200'}`}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
                                </div>

                                {/* Footer */}
                                {showNextButton && (
                                    <div className="flex items-center justify-between gap-3 p-6 border-t border-neutral-200">
                                        {showBackButton ? (
                                            <button
                                                onClick={prevStep}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 text-neutral-700 font-semibold hover:bg-neutral-100 rounded-lg transition-colors"
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                                Back
                                            </button>
                                        ) : (
                                            <div />
                                        )}
                                        <button
                                            onClick={handleNext}
                                            disabled={!canProceed}
                                            className={`px-6 py-3 font-semibold rounded-lg transition-all ${canProceed ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'}`}
                                        >
                                            {currentStep === 3 ||
                                                (currentStep === 2 && !data.hasInterviewExperience)
                                                ? 'Submit'
                                                : 'Next'}
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
