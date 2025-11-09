import { motion, AnimatePresence } from 'framer-motion'

const AnalyticsPanel = ({ isOpen, satellite, onClose }) => {
  if (!satellite) return null

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-accent-lime-green/20 border-accent-lime-green text-accent-lime-green'
      case 'critical':
        return 'bg-accent-magenta/20 border-accent-magenta text-accent-magenta'
      default:
        return 'bg-gray-500/20 border-gray-500 text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return '🟢'
      case 'critical':
        return '🔴'
      default:
        return '🟡'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          
          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-surface/95 backdrop-blur-xl border-l border-accent-magenta/30 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{satellite.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">Satellite Health Analytics</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-dark-bg rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-lg border-2 ${getStatusColor(satellite.status)}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStatusIcon(satellite.status)}</span>
                  <div>
                    <p className="font-semibold">Status: {satellite.statusText}</p>
                    <p className="text-sm opacity-80 mt-1">{satellite.category}</p>
                  </div>
                </div>
              </motion.div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* RUL Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-dark-bg/50 backdrop-blur-sm p-4 rounded-lg border border-accent-lime-green/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Remaining Useful Life</p>
                    <span className="text-xs text-accent-lime-green">CYCLES</span>
                  </div>
                  <p className="text-3xl font-bold text-accent-lime-green">{satellite.rul}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    1 cycle = 1 full charge-discharge
                  </p>
                </motion.div>

                {/* SOH Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-dark-bg/50 backdrop-blur-sm p-4 rounded-lg border border-accent-blue/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">State of Health</p>
                    <span className="text-xs text-accent-blue">NORMALIZED</span>
                  </div>
                  <p className="text-3xl font-bold text-accent-blue">
                    {(satellite.soh * 100).toFixed(0)}%
                  </p>
                  <div className="mt-2 h-2 bg-dark-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${satellite.soh * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full bg-accent-blue"
                    />
                  </div>
                </motion.div>

                {/* Capacity Retention Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-dark-bg/50 backdrop-blur-sm p-4 rounded-lg border border-accent-magenta/20 col-span-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-400">Capacity Retention</p>
                    <span className="text-xs text-accent-magenta">NORMALIZED</span>
                  </div>
                  <p className="text-3xl font-bold text-accent-magenta">
                    {(satellite.capacityRetention * 100).toFixed(0)}%
                  </p>
                  <div className="mt-2 h-2 bg-dark-surface rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${satellite.capacityRetention * 100}%` }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="h-full bg-accent-magenta"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Degradation Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-dark-bg/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50"
              >
                <h3 className="text-sm font-semibold text-gray-300 mb-2">
                  Degradation Analysis
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Battery degradation is monitored through charge-discharge cycles. 
                  Each cycle represents a complete chemical-electromechanical transduction 
                  process. Current metrics indicate{' '}
                  {satellite.status === 'critical' 
                    ? 'accelerated degradation requiring immediate attention.'
                    : 'stable degradation patterns within acceptable parameters.'}
                </p>
              </motion.div>

              {/* Action Button */}
              {satellite.status === 'critical' && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full py-3 bg-accent-magenta/20 hover:bg-accent-magenta/30 border-2 border-accent-magenta text-accent-magenta font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-magenta/50"
                >
                  Dispatch Repair Sequence
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AnalyticsPanel

