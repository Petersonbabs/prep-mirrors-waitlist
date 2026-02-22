import React, { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/Button'

interface NavbarProps {
    onAction: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onAction }) => {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
        setIsScrolled(latest > 20)
    })

    const navLinks = [
        { name: 'Features', id: 'features' },
        { name: 'Practice', id: 'practice' },
        { name: 'About', id: 'about' },
    ]

    return (
        <AnimatePresence>
            <motion.nav
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-6xl px-4"
            >
                <div className={`
                    relative flex items-center justify-between px-3 h-14 rounded-full border transition-all duration-300
                    ${isScrolled
                        ? 'bg-black/70 backdrop-blur-md border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
                        : 'bg-black/40 backdrop-blur-sm border-white/10 shadow-lg'
                    }
                `}>
                    {/* Logo */}
                    <div className="flex items-center gap-2 pl-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-white font-bold text-sm shadow-inner overflow-hidden">
                            <img src="/[favicon]-prep-mirrors-no-bg.png" alt="" className='w-full h-full object-cover' />
                        </div>
                        <span className="font-display font-bold text-white tracking-tight hidden sm:block">
                            Prep Mirrors
                        </span>
                    </div>

                    {/* Navigation Items (Pill style focus) */}
                    <div className="hidden md:flex items-center gap-1 bg-neutral-900/5 p-1 rounded-full">
                        {navLinks.map((link) => (
                            <button
                                key={link.id}
                                onClick={onAction}
                                className="px-4 py-1.5 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                            >
                                {link.name}
                            </button>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="hidden sm:inline-flex rounded-full text-white hover:text-white"
                            onClick={onAction}
                        >
                            Log in
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="rounded-full shadow-md shadow-primary-500/20"
                            onClick={onAction}
                        >
                            Get Access
                        </Button>
                    </div>
                </div>
            </motion.nav>
        </AnimatePresence>
    )
}
