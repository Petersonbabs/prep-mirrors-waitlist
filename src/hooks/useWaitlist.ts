import { useState, useCallback } from 'react'
import { updateWaitlistEntry } from '../services/waitlistService'

export interface WaitlistData {
    role: string
    level: string
    hasInterviewExperience: boolean | null
    targetAreas: string[]
}

export function useWaitlist(userId: string | number | null) {
    const [currentStep, setCurrentStep] = useState(0)
    const [data, setData] = useState<WaitlistData>({
        role: '',
        level: '',
        hasInterviewExperience: null,
        targetAreas: [],
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateData = useCallback((updates: Partial<WaitlistData>) => {
        setData((prev) => ({ ...prev, ...updates }))
    }, [])

    const nextStep = useCallback(() => {
        setCurrentStep((prev) => prev + 1)
    }, [])

    const prevStep = useCallback(() => {
        setCurrentStep((prev) => Math.max(0, prev - 1))
    }, [])

    const isStepValid = useCallback((step: number) => {
        switch (step) {
            case 0:
                return data.role.trim().length > 0
            case 1:
                return data.level !== ''
            case 2:
                return data.hasInterviewExperience !== null
            case 3:
                return data.targetAreas.length > 0 || !data.hasInterviewExperience
            default:
                return true
        }
    }, [data])

    const submitToDatabase = useCallback(async () => {
        if (!userId) return
        setLoading(true)
        setError(null)
        try {
            await updateWaitlistEntry(userId, {
                role: data.role,
                level: data.level,
                interviewed_before: data.hasInterviewExperience ?? false,
                target_areas: data.targetAreas,
            })
        } catch (err) {
            console.error('Failed to submit waitlist data:', err)
            setError('Failed to save your preferences. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [userId, data])

    return {
        data,
        updateData,
        currentStep,
        nextStep,
        prevStep,
        isStepValid,
        loading,
        error,
        submitToDatabase,
    }
}
