import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import styles from './WaitlistPage.module.css'

export const WaitlistPage: React.FC = () => {
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubmitted(true)
            
            // TODO: Integrate with backend
        }
    }

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
    }

    const sectionVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: 0.8, duration: 0.8 }
        }
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
                <motion.div className={styles.badgeWrapper} variants={itemVariants}>
                    <Badge variant="info">Coming Soon</Badge>
                </motion.div>

                <motion.h1 className={styles.title} variants={itemVariants}>
                    <span className={styles.titleGradient}>Master Your Interview.</span><br />
                    <span style={{ color: 'var(--neutral-500)' }}>Secure Your Future.</span>
                </motion.h1>

                <motion.p className={styles.description} variants={itemVariants}>
                    AI-powered mock interviews, real-time feedback, and progress tracking.
                    The ultimate preparation tool for job seekers and new graduates.
                </motion.p>

                <motion.div className={styles.formWrapper} variants={itemVariants}>
                    {!submitted ? (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" variant="primary">
                                Join Waitlist
                            </Button>
                        </form>
                    ) : (
                        <div className={styles.form} style={{ justifyContent: 'center', color: 'var(--secondary-500)' }}>
                            Example Submitted! We'll notify you.
                        </div>
                    )}
                </motion.div>

                <motion.div className={styles.socialProof} variants={itemVariants}>
                    <div className={styles.avatars}>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={styles.avatar}
                                style={{ backgroundColor: `hsl(${i * 60}, 60%, 80%)` }} // Placeholder colors
                            />
                        ))}
                    </div>
                    <div className={styles.proofText}>
                        Join <span className={styles.proofHighlight}>4,338</span> people waiting for PrepMirrors
                    </div>
                </motion.div>
            </motion.main>

            <motion.section
                className={styles.features}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <FeatureCard
                    icon="🎯"
                    title="AI Mock Interviews"
                    desc="Practice with realistic AI interviewers tailored to your industry."
                />
                <FeatureCard
                    icon="⚡"
                    title="Real-time Feedback"
                    desc="Get instant analysis on your answers, tone, and pacing."
                />
                <FeatureCard
                    icon="📈"
                    title="Progress Tracking"
                    desc="Visualize your improvement over time with detailed analytics."
                />
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
