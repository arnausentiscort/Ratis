// Hero — slideshow fullscreen amb fotos grans, crossfade i navegació
// Les fotos venen de data/photos.js. Si no existeix el fitxer, mostra gradient fosc.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'

const GRADIENTS = [
  'linear-gradient(135deg,#2C1810,#4A2E1C)',
  'linear-gradient(135deg,#1A2C1C,#2E4A30)',
  'linear-gradient(135deg,#1C1A2C,#302E4A)',
  'linear-gradient(135deg,#2C2A1A,#4A482E)',
  'linear-gradient(135deg,#2C1818,#4A2E2E)',
  'linear-gradient(135deg,#1A2A2C,#2E484A)',
  'linear-gradient(135deg,#241A2C,#3C2E4A)',
  'linear-gradient(135deg,#2C2018,#4A3E2E)',
]

const ArrowBtn = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === -1 ? 'Anterior' : 'Següent'}
    style={{
      position: 'absolute',
      top: '50%',
      [dir === -1 ? 'left' : 'right']: '20px',
      transform: 'translateY(-50%)',
      zIndex: 5,
      width: '46px',
      height: '46px',
      borderRadius: '50%',
      border: '1px solid rgba(255,255,255,0.22)',
      backgroundColor: 'rgba(255,255,255,0.08)',
      color: '#fff',
      fontSize: '1.1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transition: 'background 0.2s,border 0.2s',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.18)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'
    }}
  >
    {dir === -1 ? '←' : '→'}
  </button>
)

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const [imgErrors, setImgErrors] = useState({})

  // Auto-avança cada 5 s; es reinicia amb timerKey o quan es pausa
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setCurrent(c => (c + 1) % photos.length), 5000)
    return () => clearInterval(t)
  }, [paused, timerKey])

  const go = dir => {
    setCurrent(c => (c + dir + photos.length) % photos.length)
    setTimerKey(k => k + 1)
  }

  const goTo = i => {
    setCurrent(i)
    setTimerKey(k => k + 1)
  }

  const photo = photos[current]
  const hasImg = photo && !imgErrors[photo.id]

  return (
    <section
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: '#1a0e08', userSelect: 'none' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Foto amb crossfade ── */}
      <AnimatePresence>
        <motion.div
          key={photo.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: GRADIENTS[current % GRADIENTS.length],
          }}
        >
          {hasImg && (
            <img
              src={photo.src}
              alt=""
              onError={() => setImgErrors(e => ({ ...e, [photo.id]: true }))}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay gradient ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to bottom,rgba(0,0,0,0.18) 0%,transparent 28%,transparent 52%,rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* ── Títol centrat ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(6rem, 15vw, 14rem)',
            fontWeight: '400',
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            textShadow: '0 2px 48px rgba(0,0,0,0.28)',
          }}
        >
          Ratis
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            marginTop: '18px',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.88rem',
            fontWeight: '300',
            letterSpacing: '0.24em',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'lowercase',
          }}
        >
          des del 2023
        </motion.p>
      </div>

      {/* ── Flechas ── */}
      <ArrowBtn dir={-1} onClick={() => go(-1)} />
      <ArrowBtn dir={1} onClick={() => go(1)} />

      {/* ── Barra inferior: descripció | dots | comptador ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,
          padding: '0 48px 36px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Descripció */}
        <AnimatePresence mode="wait">
          <motion.p
            key={photo.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.86rem',
              fontWeight: '300',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.65,
              maxWidth: '320px',
              margin: 0,
            }}
          >
            {photo.descripcio}
          </motion.p>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexShrink: 0 }}>
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '22px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor:
                  i === current ? '#fff' : 'rgba(255,255,255,0.32)',
                transition: 'all 0.35s ease',
              }}
            />
          ))}
        </div>

        {/* Comptador */}
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.76rem',
            color: 'rgba(255,255,255,0.42)',
            letterSpacing: '0.12em',
            flexShrink: 0,
          }}
        >
          {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(photos.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
