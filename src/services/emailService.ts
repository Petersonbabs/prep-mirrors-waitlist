import { Resend } from 'resend'

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY)

const TEAM_EMAILS = ['timiebabs@gmail.com', 'prepmirrors@gmail.com']

export const sendWaitlistNotification = async (email: string) => {
    try {
        await resend.emails.send({
            from: 'Prep Mirrors <prepmirrors@gmail.com>',
            to: TEAM_EMAILS,
            subject: '🚀 New Waitlist Sign-up!',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #6366f1;">New User Joined!</h2>
                    <p>A new user has just signed up for the Prep Mirrors waitlist.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-top: 10px;">
                        <strong>Email:</strong> ${email}
                    </div>
                    <p style="font-size: 12px; color: #666; margin-top: 20px;">
                        Sent automatically from Prep Mirrors Landing Page.
                    </p>
                </div>
            `
        })
    } catch (error) {
        console.error('Failed to send waitlist notification:', error)
    }
}

export const sendOnboardingNotification = async (email: string, data: any) => {
    try {
        await resend.emails.send({
            from: 'Prep Mirrors <onboarding@resend.dev>',
            to: TEAM_EMAILS,
            subject: '🎯 Onboarding Completed!',
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #10b981;">Onboarding Completed!</h2>
                    <p>A user has finished their diagnostic profile.</p>
                    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 10px 0;">
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Role:</strong> ${data.role || 'N/A'}</p>
                        <p><strong>Level:</strong> ${data.level || 'N/A'}</p>
                        <p><strong>Interview Experience:</strong> ${data.interviewed_before ? 'Yes' : 'No'}</p>
                        <p><strong>Target Areas:</strong> ${data.target_areas?.join(', ') || 'None'}</p>
                    </div>
                    <p style="font-size: 12px; color: #666; margin-top: 20px;">
                        Sent automatically from Prep Mirrors Landing Page.
                    </p>
                </div>
            `
        })
    } catch (error) {
        console.error('Failed to send onboarding notification:', error)
    }
}
