import { motion } from 'framer-motion'
interface TikTokEmbedProps {
  onDone: () => void
}
export function TikTokEmbed({ onDone }: TikTokEmbedProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
          Follow Us on TikTok
        </h3>
        <p className="text-neutral-600">
          Get interview tips, practice scenarios, and success stories.
        </p>
      </div>

      <div className="bg-neutral-50 rounded-lg p-4 border-2 border-neutral-200">
        <div className="aspect-video max-h-[500px] mx-auto bg-black rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.tiktok.com/embed/@prep.mirrors"
            className="w-full h-full"
            allowFullScreen
            scrolling="no"
            allow="encrypted-media"
            title="PrepMirrors TikTok Profile"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:justify-center flex-col-reverse md:flex-normal md:items-center gap-3">
        <button
          onClick={onDone}
          className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 hover:text-white transition-colors"
        >
          Done
        </button>
        <a
          href="https://www.tiktok.com/@prep.mirrors"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white font-semibold rounded-lg hover:bg-neutral-800 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
          </svg>
          Open in TikTok
        </a>
      </div>
    </motion.div>
  )
}
