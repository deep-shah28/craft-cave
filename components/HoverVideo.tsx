'use client'

import { useRef, useState, useEffect } from 'react'
import { Play } from 'lucide-react'

interface HoverVideoProps {
  src: string
  poster: string
  alt: string
  className?: string
}

export default function HoverVideo({ src, poster, alt, className = '' }: HoverVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        ('ontouchstart' in window) ||
        (window.innerWidth <= 768)
      setIsMobile(isMobileDevice)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Add video event listeners
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  // Auto-play on mobile when component mounts
  useEffect(() => {
    if (isMobile && videoRef.current) {
      const playVideo = async () => {
        try {
          setIsLoading(true)
          await videoRef.current?.play()
          setHasInteracted(true)
        } catch (error) {
          console.log('Video autoplay failed on mobile:', error)
        } finally {
          setIsLoading(false)
        }
      }
      
      // Small delay to ensure video is loaded
      const timer = setTimeout(playVideo, 100)
      return () => clearTimeout(timer)
    }
  }, [isMobile, src])

  const handleMouseEnter = async () => {
    // Don't use hover behavior on mobile
    if (isMobile || !videoRef.current || isLoading) return
    
    setIsLoading(true)
    try {
      videoRef.current.currentTime = 0
      await videoRef.current.play()
      setHasInteracted(true)
    } catch (error) {
      console.log('Video play failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMouseLeave = () => {
    // Don't use hover behavior on mobile
    if (isMobile || !videoRef.current) return
    
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  const handleClick = async () => {
    if (!videoRef.current) return
    
    if (videoRef.current.paused) {
      try {
        await videoRef.current.play()
        setHasInteracted(true)
      } catch (error) {
        console.log('Video play failed:', error)
      }
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        muted
        loop
        preload="metadata"
        playsInline
      />
      
      {/* Play button overlay - shows when video is paused */}
      <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
        isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="bg-white/90 rounded-full p-3 group-hover:bg-white transition-colors">
          <Play className="h-6 w-6 text-stone-900" />
        </div>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <div className="bg-white/90 rounded-full p-3">
            <div className="animate-spin h-6 w-6 border-2 border-stone-900 border-t-transparent rounded-full" />
          </div>
        </div>
      )}

      {/* Hover/Touch hint */}
      {!isMobile && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Hover to preview
        </div>
      )}
      {isMobile && !hasInteracted && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded transition-opacity duration-300 pointer-events-none">
          Tap to control
        </div>
      )}
    </div>
  )
}
