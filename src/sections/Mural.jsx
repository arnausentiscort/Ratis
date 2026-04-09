// Mural — galeria de fotos tipus masonry asimètric

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const placeholders = [
  { color: '#E8C5B8', height: '320px', label: 'Moment 1' },
  { color: '#A8B8A0', height: '240px', label: 'Moment 2' },
  { color: '#D4C5A9', height: '280px', label: 'Moment 3' },
  { color: '#C97B5A', height: '260px', label: 'Moment 4' },
  { color: '#B8C8D4', height: '300px', label: 'Moment 5' },
  { color: '#E8D4C0', height: '220px', label: 'Moment 6' },
  { color: '#C8D4B8', height: '340px', label: 'Moment 7' },
  { color: '#D4B8C8', height: '250px', label: 'Moment 8' },
]

function Card({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.025 }}
      style={{
        backgroundColor: item.color,
        height: item.height,
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(44,24,16,0.07)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <span
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.78rem',
          fontWeight: '400',
          color: 'rgba(44,24,16,0.45)',
          letterSpacing: '0.1em',
        }}
      >
        {item.label}
      </span>
    </motion.div>
  )
}

export default function Mural() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  // Distribuir 8 items en 3 columnes: 3 / 3 / 2
  const col1 = placeholders.slice(0, 3)
  const col2 = placeholders.slice(3, 6)
  const col3 = placeholders.slice(6, 8)

  return (
    <section
      style={{
        backgroundColor: '#FAF8F4',
        padding: '100px 48px',
      }}
    >
      {/* Títol */}
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

      {/* Grid masonry 3 columnes */}
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
        {/* Columna 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {col1.map((item, i) => (
            <Card key={item.label} item={item} index={i} />
          ))}
        </div>

        {/* Columna 2 — desplaçada cap avall per efecte masonry */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '48px' }}>
          {col2.map((item, i) => (
            <Card key={item.label} item={item} index={i + 3} />
          ))}
        </div>

        {/* Columna 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          {col3.map((item, i) => (
            <Card key={item.label} item={item} index={i + 6} />
          ))}
        </div>
      </div>
    </section>
  )
}
