// Mural — galeria de fotos tipus masonry asimètric
// Les fotos venen de src/data/photos.js
// lloc i data es llegeixen dels metadades EXIF via useExif

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
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

function Card({ photo, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [imgError, setImgError] = useState(false)
  const { lat, lng, data, lloc } = useExif(photo.src)

  const height = HEIGHTS[index % HEIGHTS.length]
  const placeholder = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length]

  // lloc: coordenades del EXIF, o "Sense ubicació" si no n'hi ha
  const llocDisplay = lloc ?? (lat == null ? 'Sense ubicació' : lloc)
  const dataDisplay = formatDataDisplay(data)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.025 }}
      style={{
        position: 'relative',
        height,
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(44,24,16,0.07)',
        cursor: 'pointer',
        backgroundColor: placeholder,
      }}
    >
      {/* Foto real — si existeix */}
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

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(44,24,16,0.55) 0%, transparent 55%)',
        }}
      />

      {/* Etiqueta inferior */}
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

  // Distribuir en 3 columnes
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
            <Card key={photo.id} photo={photo} index={i * 3} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '48px' }}>
          {col2.map((photo, i) => (
            <Card key={photo.id} photo={photo} index={i * 3 + 1} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {col3.map((photo, i) => (
            <Card key={photo.id} photo={photo} index={i * 3 + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
