// Favorits — les nostres coses favorites en comú

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const categories = [
  {
    titol: "Pel·lícules",
    bgColor: '#FAF8F4',
    borderColor: '#E8C5B8',
    items: [
      { emoji: '🎬', nom: 'Before Sunrise', desc: 'Dos desconeguts, una nit, Viena.' },
      { emoji: '🎞️', nom: 'Amélie', desc: 'Màgia quotidiana en cada fotograma.' },
      { emoji: '🍿', nom: 'Call Me by Your Name', desc: 'Estiu italià que no s\'oblida.' },
    ],
  },
  {
    titol: "Música",
    bgColor: '#F2EAE4',
    borderColor: '#C97B5A',
    items: [
      { emoji: '🎵', nom: 'Sufjan Stevens', desc: 'Cançons que semblen abraçades.' },
      { emoji: '🎶', nom: 'Bon Iver', desc: 'Per als diumenges de pluja.' },
      { emoji: '🎸', nom: 'Cigarettes After Sex', desc: 'Lent, dolç, perfecte.' },
    ],
  },
  {
    titol: "Rituals",
    bgColor: '#EEF2ED',
    borderColor: '#A8B8A0',
    items: [
      { emoji: '📺', nom: 'Capitulin', desc: "Una sèrie, el sofà i la millor excusa per no moure's." },
      { emoji: '🍝', nom: 'Carbonara', desc: 'La fem nosaltres i la busquem als restaurants italians. És la nostra mesura de tot.' },
      { emoji: '😴', nom: 'Siesta junts', desc: 'Infravalorem molt la siesta. Nosaltres no.' },
      { emoji: '🛶', nom: 'Caiac', desc: 'No ens encanta. Però sempre hi acabem. Sempre.' },
    ],
  },
]

function CategoryColumn({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        backgroundColor: cat.bgColor,
        border: `1.5px solid ${cat.borderColor}`,
        borderRadius: '20px',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
      }}
    >
      <h3
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.5rem',
          fontWeight: '400',
          color: '#2C1810',
          marginBottom: '32px',
          textAlign: 'center',
          letterSpacing: '0.02em',
        }}
      >
        {cat.titol}
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {cat.items.map((item) => (
          <div key={item.nom} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.6rem', lineHeight: 1, flexShrink: 0 }}>
              {item.emoji}
            </span>
            <div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.92rem',
                  fontWeight: '500',
                  color: '#2C1810',
                  marginBottom: '3px',
                }}
              >
                {item.nom}
              </div>
              <div
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: '300',
                  color: '#7A6055',
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Favorites() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section style={{ backgroundColor: '#F5F1EA', padding: '100px 48px 120px' }}>
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
          marginBottom: '64px',
        }}
      >
        Les nostres coses
      </motion.h2>

      {/* 3 columnes */}
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {categories.map((cat, i) => (
          <CategoryColumn key={cat.titol} cat={cat} index={i} />
        ))}
      </div>
    </section>
  )
}
