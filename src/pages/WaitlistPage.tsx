import React, { useState } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { addToWaitlist } from '../services/waitlistService'
import { WaitlistModal } from '../components/waitlist/WaitlistModal'
import styles from './WaitlistPage.module.css'

export const WaitlistPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState<string | number | null>(null)

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await addToWaitlist({ email })
            if (data?.id) {
                setUserId(data.id)
                setIsModalOpen(true)
            }
        } catch (err) {
            console.error(err)
            // Error handling could be added here
        } finally {
            setLoading(false)
        }
    }

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
                </AnimatePresence>

                <motion.div className={styles.socialProof} variants={itemVariants}>
                    <div className={styles.avatars}>
                        {[1, 2, 3, 4].map(i => <div key={i} className={styles.avatar} style={{ backgroundColor: `hsl(${i * 60}, 60%, 80%)` }} />)}
                    </div>
                    <div className={styles.proofText} style={{ color: "var(--neutral-800)" }}>Join <span className={styles.proofHighlight}>338</span> people waiting</div>
                </motion.div>
            </motion.main>

            <WaitlistModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userId={userId}
            />

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
