// Mural — galeria de fotos tipus masonry asimètric
// Les fotos venen de src/data/photos.js
// lloc i data es llegeixen dels metadades EXIF via useExif

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { photos } from '../data/photos'
import { useExif } from '../hooks/useExif'

// Alçades masonry — es roten per donar ritme visual
const HEIGHTS = ['320px', '240px', '280px', '260px', '300px', '220px', '340px', '250px']

// Colors de fons placeholder — s'usen mentre la foto no existeix o carrega
const PLACEHOLDER_COLORS = [
  '#E8C5B8', '#A8B8A0', '#D4C5A9', '#C97B5A',
  '#B8C8D4', '#E8D4C0', '#C8D4B8', '#D4B8C8',
]

function formatDataDisplay(dataStr) {
  if (!dataStr) return null
  const [year, month] = dataStr.split('-')
  const mesos = ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des']
  return `${mesos[parseInt(month, 10) - 1]} ${year}`
}

function Lightbox({ photo, onClose }) {
  const { lat, lloc, data } = useExif(photo.src)
  const llocDisplay = lloc ?? (lat == null ? null : lloc)
  const dataDisplay = formatDataDisplay(data)

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.88)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative',
            maxWidth: 'min(90vw, 960px)',
            maxHeight: '90vh',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}
        >
          <img
            src={photo.src}
            alt={photo.descripcio ?? ''}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
            }}
          />
          {(llocDisplay || dataDisplay || photo.descripcio) && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 24px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              }}
            >
              {(llocDisplay || dataDisplay) && (
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#fff', marginBottom: '4px' }}>
                  {[llocDisplay, dataDisplay].filter(Boolean).join(' · ')}
                </div>
              )}
              {photo.descripcio && (
                <div style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.84rem', fontWeight: '300', color: 'rgba(255,255,255,0.75)' }}>
                  {photo.descripcio}
                </div>
              )}
            </div>
          )}
          <button
            onClick={onClose}
            aria-label="Tancar"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(0,0,0,0.4)',
              color: '#fff',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

function Card({ photo, index, onOpen }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [imgError, setImgError] = useState(false)
  const { lat, lng, data, lloc } = useExif(photo.src)

  const height = HEIGHTS[index % HEIGHTS.length]
  const placeholder = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]

  const llocDisplay = lloc ?? (lat == null ? 'Sense ubicació' : lloc)
  const dataDisplay = formatDataDisplay(data)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.025 }}
      onClick={() => onOpen(photo)}
      style={{
        position: 'relative',
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(44,24,16,0.07)',
        cursor: 'zoom-in',
        backgroundColor: placeholder,
      }}
    >
      {!imgError && (
        <img
          src={photo.src}
          alt={llocDisplay}
          onError={() => setImgError(true)}
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

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(44,24,16,0.55) 0%, transparent 55%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '14px 16px',
        }}
      >
        <div
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '0.95rem',
            fontWeight: '400',
            color: '#fff',
            lineHeight: 1.2,
          }}
        >
          {llocDisplay}
        </div>
        {dataDisplay && (
          <div
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.72rem',
              fontWeight: '300',
              color: 'rgba(255,255,255,0.7)',
              marginTop: '2px',
              letterSpacing: '0.08em',
            }}
          >
            {dataDisplay}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Mural() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const [lightboxPhoto, setLightboxPhoto] = useState(null)

  const col1 = photos.filter((_, i) => i % 3 === 0)
  const col2 = photos.filter((_, i) => i % 3 === 1)
  const col3 = photos.filter((_, i) => i % 3 === 2)

  return (
    <section style={{ backgroundColor: '#FAF8F4', padding: '100px 48px' }}>
      <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 24 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          textAlign: 'center',
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: '400',
          color: '#2C1810',
          letterSpacing: '0.02em',
          marginBottom: '56px',
        }}
      >
        Els nostres moments
      </motion.h2>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {col1.map((photo, i) => (
            <Card key={photo.id} photo={photo} index={i * 3} onOpen={setLightboxPhoto} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '48px' }}>
          {col2.map((photo, i) => (
            <Card key={photo.id} photo={photo} index={i * 3 + 1} onOpen={setLightboxPhoto} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {col3.map((photo, i) => (
            <Card key={photo.id} photo={photo} index={i * 3 + 2} onOpen={setLightboxPhoto} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxPhoto && (
          <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
