'use client'

import { useRef, useState } from 'react'
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

  const handleMouseEnter = async () => {
    if (!videoRef.current || isLoading) return
    
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
    if (!videoRef.current) return
    
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
        hasInteracted && !videoRef.current?.paused ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

      {/* Hover hint */}
      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Hover to preview
      </div>
    </div>
  )
}
