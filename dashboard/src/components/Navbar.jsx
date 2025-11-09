import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full bg-dark-surface/80 backdrop-blur-md border-b border-accent-magenta/20 px-8 py-4 z-50 relative"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo - Satellite Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 flex items-center justify-center"
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {/* Satellite body */}
              <rect x="40" y="35" width="20" height="30" rx="2" />
              {/* Solar panels */}
              <rect x="20" y="40" width="15" height="20" rx="1" />
              <rect x="65" y="40" width="15" height="20" rx="1" />
              {/* Antenna dish */}
              <path d="M 50 65 Q 45 75 50 80 Q 55 75 50 65" />
              {/* Signal lines */}
              <path d="M 50 80 L 45 90" strokeWidth="1.5" />
              <path d="M 50 80 L 50 90" strokeWidth="1.5" />
              <path d="M 50 80 L 55 90" strokeWidth="1.5" />
            </svg>
          </motion.div>
          
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Heimdall
            </h1>
            <p className="text-xs text-gray-400 italic">
              Predictive Intelligence for Satellite Longevity
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center space-x-6"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent-lime-green rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">System Online</span>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

export default Navbar

