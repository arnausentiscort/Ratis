// Timeline — la nostra història, línia de temps vertical

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const moments = [
  {
    data: 'Març 2023',
    titol: 'El primer dia',
    descripcio: 'Tot va començar amb una conversa que no volia acabar i un passeig fins a les tres de la matinada.',
    color: '#E8C5B8',
    side: 'left',
  },
  {
    data: 'Agost 2023',
    titol: 'El primer viatge',
    descripcio: 'Lisboa ens va robar el cor. Pastéis de nata al matí i el Tajo al capvespre.',
    color: '#A8B8A0',
    side: 'right',
  },
  {
    data: 'Desembre 2023',
    titol: 'Primer Nadal junts',
    descripcio: 'Neu, cacao calent i la sensació que ja no ens podíem imaginar les festes de cap altra manera.',
    color: '#E8C5B8',
    side: 'left',
  },
  {
    data: 'Juny 2024',
    titol: 'Roma',
    descripcio: 'Vam llançar una moneda a la Fontana di Trevi. "Tornarem," vas dir. I ho crec.',
    color: '#A8B8A0',
    side: 'right',
  },
]

function TimelineItem({ moment, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = moment.side === 'left'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 48px 1fr',
        alignItems: 'start',
        marginBottom: '64px',
      }}
    >
      {/* Contingut esquerra */}
      <div style={{ textAlign: 'right', paddingRight: '32px', paddingTop: '6px' }}>
        {isLeft && <Card moment={moment} />}
      </div>

      {/* Eix central */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: moment.color,
            border: '3px solid #FAF8F4',
            boxShadow: `0 0 0 2px ${moment.color}`,
            flexShrink: 0,
            marginTop: '8px',
          }}
        />
      </div>

      {/* Contingut dreta */}
      <div style={{ paddingLeft: '32px', paddingTop: '6px' }}>
        {!isLeft && <Card moment={moment} />}
      </div>
    </motion.div>
  )
}

function Card({ moment }) {
  return (
    <div
      style={{
        backgroundColor: moment.color,
        borderRadius: '16px',
        padding: '24px 28px',
        boxShadow: '0 4px 20px rgba(44,24,16,0.06)',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.78rem',
          fontWeight: '500',
          letterSpacing: '0.14em',
          color: '#7A6055',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {moment.data}
      </span>
      <h3
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.3rem',
          fontWeight: '500',
          color: '#2C1810',
          marginBottom: '10px',
          lineHeight: 1.3,
        }}
      >
        {moment.titol}
      </h3>
      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.88rem',
          color: '#5A3E35',
          lineHeight: 1.7,
          fontWeight: '300',
        }}
      >
        {moment.descripcio}
      </p>
    </div>
  )
}

export default function Timeline() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })

  return (
    <section style={{ backgroundColor: '#FAF8F4', padding: '100px 48px' }}>
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
          marginBottom: '72px',
        }}
      >
        La nostra història
      </motion.h2>

      {/* Contenidor amb línia central */}
      <div
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {/* Línia vertical */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            backgroundColor: '#E8C5B8',
            transform: 'translateX(-50%)',
          }}
        />

        {moments.map((moment, i) => (
          <TimelineItem key={moment.titol} moment={moment} index={i} />
        ))}
      </div>
    </section>
  )
}
