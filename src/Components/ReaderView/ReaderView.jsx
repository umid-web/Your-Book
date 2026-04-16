import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaSun, FaMoon, FaFont, FaPlus, FaMinus } from 'react-icons/fa'
import './ReaderView.scss'

const ReaderView = ({ chapters, onChapterComplete }) => {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [fontSize, setFontSize] = useState(16)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showTestButton, setShowTestButton] = useState(false)

  const currentChapterData = chapters[currentChapter]

  useEffect(() => {
    // Check if user has scrolled to bottom of chapter
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight >= documentHeight - 100) {
        setShowTestButton(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentChapter])

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24))
  }

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12))
  }

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  const nextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(prev => prev + 1)
      setShowTestButton(false)
      window.scrollTo(0, 0)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1)
      setShowTestButton(false)
      window.scrollTo(0, 0)
    }
  }

  const handleTestStart = () => {
    if (onChapterComplete) {
      onChapterComplete(currentChapter)
    }
  }

  return (
    <div
      className={`reader-view ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      style={{ '--reader-font-size': `${fontSize}px` }}
    >
      <div className="reader-controls">
        <div className="control-group">
          <button
            className="control-btn"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <div className="font-controls">
            <button
              className="control-btn"
              onClick={decreaseFontSize}
              aria-label="Decrease font size"
            >
              <FaMinus />
            </button>
            <span className="font-size-display">
              <FaFont /> {fontSize}px
            </span>
            <button
              className="control-btn"
              onClick={increaseFontSize}
              aria-label="Increase font size"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="chapter-info">
          <span className="chapter-title">
            {currentChapterData?.title || `Bob ${currentChapter + 1}`}
          </span>
          <span className="chapter-progress">
            {currentChapter + 1} / {chapters.length}
          </span>
        </div>
      </div>

      <motion.div
        className="reader-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="content-title">
          {currentChapterData?.title || `Bob ${currentChapter + 1}`}
        </h1>

        <div className="content-text">
          {currentChapterData?.content || (
            <p>
              Bu yerda {currentChapter + 1}-bobning matni bo'ladi.
              Siz bu yerda o'zingizning kitob matningizni joylashtirishingiz mumkin.
              Matn o'qish jarayonida shrift o'lchamini o'zgartirishingiz va
              tungi/kunduzgi rejimlarni almashtirishingiz mumkin.
            </p>
          )}
        </div>

        {showTestButton && (
          <motion.div
            className="test-section"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="test-btn"
              onClick={handleTestStart}
            >
              📝 Test topshirish
            </button>
          </motion.div>
        )}
      </motion.div>

      <div className="chapter-navigation">
        <button
          className="nav-btn prev"
          onClick={prevChapter}
          disabled={currentChapter === 0}
        >
          ← Oldingi bob
        </button>

        <button
          className="nav-btn next"
          onClick={nextChapter}
          disabled={currentChapter === chapters.length - 1}
        >
          Keyingi bob →
        </button>
      </div>
    </div>
  )
}

export default ReaderView
