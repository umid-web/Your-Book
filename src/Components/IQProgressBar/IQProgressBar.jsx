import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './IQProgressBar.scss'

const IQProgressBar = ({ targetIQ = 135, duration = 3000 }) => {
  const [currentIQ, setCurrentIQ] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(easeOutQuart * targetIQ)
      
      setCurrentIQ(currentValue)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [targetIQ, duration])

  return (
    <div className="iq-progress-bar">
      <div className="iq-container">
        <motion.div 
          className="iq-display"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isComplete ? 1.1 : 1, 
            opacity: 1 
          }}
          transition={{ duration: 0.3 }}
        >
          <span className={`iq-number ${isComplete ? 'complete' : ''}`}>
            {currentIQ}
          </span>
          <span className="iq-label">IQ</span>
        </motion.div>
        
        <div className="progress-track">
          <motion.div 
            className="progress-fill"
            initial={{ width: "0%" }}
            animate={{ width: `${(currentIQ / targetIQ) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {isComplete && (
          <motion.div 
            className="wow-effect"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            🎉 Ajoyib! Sizning IQ darajangiz {targetIQ}+!
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default IQProgressBar
