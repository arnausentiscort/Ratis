// Hero — pantalla completa, fons crema amb grain, títol "Ratis"

import { motion } from 'framer-motion'

const grainSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAF8F4',
        overflow: 'hidden',
      }}
    >
      {/* Grain texture */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: grainSvg,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px 300px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Títol */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(6rem, 15vw, 14rem)',
          fontWeight: '400',
          color: '#2C1810',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        Ratis
      </motion.h1>

      {/* Subtítol data */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: '20px',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.95rem',
          fontWeight: '300',
          letterSpacing: '0.18em',
          color: '#C97B5A',
          textTransform: 'lowercase',
        }}
      >
        des del 2023
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#C97B5A',
          opacity: 0.7,
        }}
      />
    </section>
  )
}
