import { supabase } from '../lib/supabase'

export interface WaitlistEntry {
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

    return data?.[0]
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

    return data?.[0]
}

export const searchJobTitles = async (query: string) => {
    if (!query || query.length < 2) return []

    // Diagnostic log
    console.log('Searching for:', query)

    const { data, error, status, statusText } = await supabase
        .from('job_titles')
        .select('name, slug')
        .ilike('name', `%${query}%`)
        .limit(8)

    console.log('Search Results:', { data, error, status, statusText })

    if (error) {
        console.error('Error searching job titles:', error)
        throw error
    }

    return data
}
