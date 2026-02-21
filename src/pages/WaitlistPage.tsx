import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { addToWaitlist, updateWaitlistEntry } from '../services/waitlistService'
import styles from './WaitlistPage.module.css'

type FunnelStage = 'hero' | 'modal' | 'animation' | 'tiktok'
type ModalStep = 'role-level' | 'experience' | 'targets'

export const WaitlistPage: React.FC = () => {
    const [stage, setStage] = useState<FunnelStage>('hero')
    const [modalStep, setModalStep] = useState<ModalStep>('role-level')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [level, setLevel] = useState('')
    const [interviewedBefore, setInterviewedBefore] = useState<boolean | null>(null)
    const [targetAreas, setTargetAreas] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | number | null>(null)
    const [typingText, setTypingText] = useState('')

    const roles = ['Product Manager', 'Software Engineer', 'Designer', 'Data Scientist', 'Other']
    const levels = ['Intern', 'Junior', 'Mid-level', 'Senior', 'Lead']
    const improvementAreas = ['Confidence', 'Technical Depth', 'Storytelling', 'Time Management', 'Answering Behaviorals', 'Negotiation']

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await addToWaitlist({ email })
            if (data?.id) {
                setUserId(data.id)
                setStage('modal')
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleModalUpdate = async () => {
        if (!userId) return
        setLoading(true)
        try {
            await updateWaitlistEntry(userId, {
                role,
                level,
                interviewed_before: interviewedBefore ?? false,
                target_areas: targetAreas
            })
            setStage('animation')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Typing Animation Logic
    useEffect(() => {
        if (stage === 'animation') {
            const areaString = targetAreas.length > 0 ? targetAreas.join(', ') : 'your communication'
            const fullText = `Based on your goal to become a ${level} ${role}, Prep Mirrors will generate realistic mock interview scenarios tailored to your experience. 
            
Since you want to improve on ${areaString}, our AI mirror will specifically analyze your tone and content in these areas, providing instant feedback so you can walk into the real room with absolute confidence. 

Just relax, we're building the perfect practice environment for you.`

            let i = 0
            const interval = setInterval(() => {
                setTypingText(fullText.slice(0, i))
                i++
                if (i > fullText.length) {
                    clearInterval(interval)
                    setTimeout(() => setStage('tiktok'), 3000)
                }
            }, 25)
            return () => clearInterval(interval)
        }
    }, [stage, level, role, targetAreas])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    return (
        <div className={styles.page}>
            <nav className={styles.nav}>
                <div className={styles.logo}>🪞 PrepMirrors</div>
                <Button variant="ghost" size="sm">Log in</Button>
            </nav>

            <motion.main
                className={styles.main}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <AnimatePresence mode="wait">
                    {stage === 'hero' && (
                        <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <motion.div className={styles.badgeWrapper} variants={itemVariants}>
                                <Badge variant="info">Coming Soon</Badge>
                            </motion.div>
                            <motion.h1 className={styles.title} variants={itemVariants}>
                                <span className={styles.titleGradient}>Practice interviews</span><br />without pressure.
                            </motion.h1>
                            <motion.p className={styles.description} variants={itemVariants} style={{ color: 'var(--neutral-800)' }}>
                                Build real confidence before the real interview. Private. Judgment-free.
                            </motion.p>
                            <motion.div className={styles.formWrapper} variants={itemVariants}>
                                <form className={styles.form} onSubmit={handleEmailSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <Button type="submit" variant="primary" disabled={loading}>
                                        {loading ? 'Joining...' : 'Get Early Access'}
                                    </Button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}

                    {stage === 'animation' && (
                        <motion.div key="animation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={styles.typingContainer}>
                            <p className={styles.typingText}>{typingText}</p>
                        </motion.div>
                    )}

                    {stage === 'tiktok' && (
                        <motion.div key="tiktok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.tiktokSection}>
                            <h2 className={styles.modalTitle}>You're all set! 🎉</h2>
                            <p className={styles.modalSubtitle}>While we build your dream practice tool, join our community.</p>
                            <a href="https://tiktok.com/@prep.mirrors" target="_blank" rel="noreferrer" className={styles.tiktokCard}>
                                <div style={{ fontSize: '40px' }}>📱</div>
                                <div className={styles.tiktokHandle}>@prepmirrors</div>
                                <div style={{ fontSize: '14px', opacity: 0.8 }}>Follow us on TikTok</div>
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Social Proof only on Hero */}
                {stage === 'hero' && (
                    <motion.div className={styles.socialProof} variants={itemVariants}>
                        <div className={styles.avatars}>
                            {[1, 2, 3, 4].map(i => <div key={i} className={styles.avatar} style={{ backgroundColor: `hsl(${i * 60}, 60%, 80%)` }} />)}
                        </div>
                        <div className={styles.proofText} style={{ color: "var(--neutral-800)" }}>Join <span className={styles.proofHighlight}>338</span> people waiting</div>
                    </motion.div>
                )}
            </motion.main>

            {/* Diagnostic Modal */}
            <AnimatePresence>
                {stage === 'modal' && (
                    <motion.div className={styles.modalOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className={styles.modalContent} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                            <button className={styles.modalClose} onClick={() => setStage('hero')}>✕</button>

                            {modalStep === 'role-level' && (
                                <div key="step1">
                                    <h3 className={styles.modalTitle}>Help us personalize your experience</h3>
                                    <p className={styles.modalSubtitle}>What's your target role and level?</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <select className={styles.input} style={{ border: '1px solid #ddd', borderRadius: '8px', background: 'white' }} value={role} onChange={(e) => setRole(e.target.value)}>
                                            <option value="">Select Role</option>
                                            {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                        </select>
                                        <select className={styles.input} style={{ border: '1px solid #ddd', borderRadius: '8px', background: 'white' }} value={level} onChange={(e) => setLevel(e.target.value)}>
                                            <option value="">Select Level</option>
                                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        <Button disabled={!role || !level} onClick={() => setModalStep('experience')}>Continue</Button>
                                    </div>
                                </div>
                            )}

                            {modalStep === 'experience' && (
                                <div key="step2">
                                    <h3 className={styles.modalTitle}>Have you been in an interview before?</h3>
                                    <div className={styles.optionGrid}>
                                        <button className={styles.optionButton} onClick={() => { setInterviewedBefore(true); setModalStep('targets'); }}>Yes, several times</button>
                                        <button className={styles.optionButton} onClick={() => { setInterviewedBefore(false); handleModalUpdate(); }}>No, I'm new to this</button>
                                    </div>
                                    <button className={styles.backButton} style={{ marginTop: '20px' }} onClick={() => setModalStep('role-level')}>← Back</button>
                                </div>
                            )}

                            {modalStep === 'targets' && (
                                <div key="step3">
                                    <h3 className={styles.modalTitle}>What would you like to improve?</h3>
                                    <div className={styles.optionGrid} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                                        {improvementAreas.map(area => (
                                            <button
                                                key={area}
                                                className={`${styles.optionButton} ${targetAreas.includes(area) ? styles.optionActive : ''}`}
                                                onClick={() => setTargetAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area])}
                                            >
                                                {area}
                                            </button>
                                        ))}
                                    </div>
                                    <Button style={{ marginTop: '20px', width: '100%' }} onClick={handleModalUpdate} loading={loading}>Finish 🎉</Button>
                                    <button className={styles.backButton} style={{ marginTop: '20px' }} onClick={() => setModalStep('experience')}>← Back</button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.section className={styles.features} initial="hidden" animate="visible" variants={itemVariants}>
                <FeatureCard icon="🎯" title="AI Mock Interviews" desc="Practice with realistic AI interviewers tailored to your industry." />
                <FeatureCard icon="⚡" title="Real-time Feedback" desc="Get instant analysis on your answers, tone, and pacing." />
                <FeatureCard icon="📈" title="Progress Tracking" desc="Visualize your improvement over time with detailed analytics." />
            </motion.section>
        </div>
    )
}

const FeatureCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
    <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureTitle}>{title}</div>
        <div className={styles.featureDesc}>{desc}</div>
    </div>
)
