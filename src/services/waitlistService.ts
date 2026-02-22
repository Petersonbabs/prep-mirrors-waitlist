import { supabase } from '../lib/supabase'
import { sendWaitlistNotification, sendOnboardingNotification } from './emailService'

export interface WaitlistEntry {
    id?: string | number
    email: string
    role?: string
    level?: string
    interviewed_before?: boolean
    target_areas?: string[]
    challenge?: string
}

export const addToWaitlist = async (entry: WaitlistEntry) => {
    const { data, error } = await supabase
        .from('waitlist')
        .insert([
            {
                email: entry.email,
                role: entry.role,
                level: entry.level,
                interviewed_before: entry.interviewed_before,
                target_areas: entry.target_areas,
                challenge: entry.challenge,
                created_at: new Date().toISOString(),
            },
        ])
        .select()

    if (error) {
        console.error('Error adding to waitlist:', error)
        throw error
    }

    const result = data?.[0]

    // Send background notification to team
    if (result) {
        sendWaitlistNotification(result.email)
    }

    return result
}

export const updateWaitlistEntry = async (id: string | number, entry: Partial<WaitlistEntry>) => {
    const { data, error } = await supabase
        .from('waitlist')
        .update({
            role: entry.role,
            level: entry.level,
            interviewed_before: entry.interviewed_before,
            target_areas: entry.target_areas,
            challenge: entry.challenge,
        })
        .eq('id', id)
        .select()

    if (error) {
        console.error('Error updating waitlist entry:', error)
        throw error
    }

    const result = data?.[0]

    // Send background notification for onboarding completion
    if (result) {
        sendOnboardingNotification(result.email, result)
    }

    return result
}

export const searchJobTitles = async (query: string) => {
    if (!query || query.length < 2) return []

    const { data, error } = await supabase
        .from('job_titles')
        .select('name, slug')
        .ilike('name', `%${query}%`)
        .limit(8)

    if (error) {
        console.error('Error searching job titles:', error)
        throw error
    }

    return data
}

export const getWaitlistCount = async () => {
    const { count, error } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })

    if (error) {
        console.error('Error fetching waitlist count:', error)
        return 0
    }

    return count || 0
}
