import  { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
interface TypingAnimationProps {
  text: string
  onComplete: () => void
  speed?: number
}
export function TypingAnimation({
  text,
  onComplete,
  speed = 30,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (currentIndex === text.length) {
      // Wait 1 second after completion before calling onComplete
      const timeout = setTimeout(() => {
        onComplete()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed, onComplete])
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <span className="text-3xl">🪞</span>
        </div>
        <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          How PrepMirrors Helps You
        </h3>
      </div>

      <div className="bg-neutral-50 rounded-lg p-6 min-h-[200px]">
        <p className="text-lg text-neutral-700 leading-relaxed">
          {displayedText}
          <motion.span
            animate={{
              opacity: [1, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="inline-block w-0.5 h-5 bg-primary-500 ml-1"
          />
        </p>
      </div>

      <div className="text-center text-sm text-neutral-500">
        Please wait while we explain...
      </div>
    </motion.div>
  )
}
