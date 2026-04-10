// Activities — panells d'activitats amb pestanyes
// Cada categoria té la seva pestanya i un grid de targetes.

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'

const TABS = [
  { key: 'viatges',    label: 'Viatges',    icon: '✈️' },
  { key: 'senderisme', label: 'Senderisme', icon: '⛰️' },
  { key: 'concerts',   label: 'Concerts',   icon: '🎵' },
  { key: 'restaurants',label: 'Restaurants',icon: '🍽️' },
  { key: 'cinema',     label: 'Cinema',     icon: '🎬' },
]

const ACTIVITIES = {
  viatges: [
    {
      id: 1,
      titol: 'Lisboa',
      subtitol: 'Agost 2023',
      descripcio: 'Tramvies, pastéis de nata i el Tajo al fons. La primera vegada que vam agafar un avió junts.',
      color: '#E8C5B8',
      accent: '#C97B5A',
    },
    {
      id: 2,
      titol: 'Roma',
      subtitol: 'Juny 2024',
      descripcio: 'Vam llançar una moneda a la Fontana di Trevi. "Tornarem," vas dir. I ho crec.',
      color: '#D4C5A9',
      accent: '#8A6A3A',
    },
    {
      id: 3,
      titol: 'Amsterdam',
      subtitol: 'Abril 2024',
      descripcio: 'Canals, bicicletes i tulipes. Vam perdre el mapa i va ser el millor pla del viatge.',
      color: '#B8C8D4',
      accent: '#3A6A8A',
    },
    {
      id: 4,
      titol: 'Londres',
      subtitol: 'Gener 2024',
      descripcio: 'Pluja, mercats vintage i una tassa de té a cada cantonada.',
      color: '#C8D4B8',
      accent: '#4A6A3A',
    },
    {
      id: 5,
      titol: 'Praga',
      subtitol: 'Juliol 2024',
      descripcio: 'Ponts de pedra i la ciutat daurada al capvespre. Caminades sense fi.',
      color: '#D4B8C8',
      accent: '#6A3A5A',
    },
    {
      id: 6,
      titol: 'Kyoto',
      subtitol: 'Octubre 2024',
      descripcio: 'Bambus, tardor vermella i la pau dels temples als matins brumosos.',
      color: '#E8D4B8',
      accent: '#8A5A2A',
    },
  ],
  senderisme: [
    {
      id: 1,
      titol: 'Montserrat',
      subtitol: 'Octubre 2023',
      descripcio: 'La primera ruta seriosa junts. Vam arribar al cim amb les cames tremolant i somrient.',
      color: '#A8B8A0',
      accent: '#3A5A30',
    },
    {
      id: 2,
      titol: 'Garrotxa',
      subtitol: 'Febrer 2024',
      descripcio: 'Volcans apagats i fagedes màgiques. Boira baixa i silenci total.',
      color: '#B8D4B0',
      accent: '#2A4A22',
    },
    {
      id: 3,
      titol: 'Collserola',
      subtitol: 'Desembre 2023',
      descripcio: 'El bosc de casa nostra. Matins frescos i Barcelona al fons.',
      color: '#C8D8C0',
      accent: '#3A5230',
    },
  ],
  concerts: [
    {
      id: 1,
      titol: 'Bon Iver',
      subtitol: 'Primavera Sound · Juny 2023',
      descripcio: 'El primer concert junts. Vam arribar tard i no ens importava gens.',
      color: '#D4C0D8',
      accent: '#5A3A6A',
    },
    {
      id: 2,
      titol: 'Cigarettes After Sex',
      subtitol: 'Sala Apolo · Novembre 2023',
      descripcio: 'Lent, fosc i perfecte. Vam estar abrazats tota la nit.',
      color: '#C0C4D8',
      accent: '#3A3A6A',
    },
    {
      id: 3,
      titol: 'Sufjan Stevens',
      subtitol: 'Liceu · Març 2024',
      descripcio: 'Les cançons que escoltàvem quan ens vam conèixer. Va ser màgic.',
      color: '#D8D0C0',
      accent: '#6A5A3A',
    },
  ],
  restaurants: [
    {
      id: 1,
      titol: 'Bar Cañete',
      subtitol: 'Barcelona · El Raval',
      descripcio: 'La millor truita de la ciutat. Hi anem cada vegada que hi ha alguna cosa a celebrar.',
      color: '#F0D8C0',
      accent: '#8A4A20',
    },
    {
      id: 2,
      titol: 'Bodega Sepúlveda',
      subtitol: 'Barcelona · Eixample',
      descripcio: 'Vi natural, tapes i converses que no acaben mai.',
      color: '#D8C0C0',
      accent: '#6A2A2A',
    },
    {
      id: 3,
      titol: 'Time Out Market',
      subtitol: 'Lisboa · Cais do Sodré',
      descripcio: 'Pastéis de nata al matí i petiscos al vespre. Perfecte.',
      color: '#C0D4D8',
      accent: '#2A5A6A',
    },
    {
      id: 4,
      titol: 'Roscioli',
      subtitol: 'Roma · Campo de\' Fiori',
      descripcio: 'La pasta cacio e pepe més bona del món. Punt.',
      color: '#D8D0B8',
      accent: '#5A4A20',
    },
  ],
  cinema: [
    {
      id: 1,
      titol: 'Before Sunrise',
      subtitol: 'Richard Linklater · 1995',
      descripcio: 'La primera pel·lícula que vam veure junts al sofà. Dos desconeguts, una nit, Viena.',
      color: '#C8C0D8',
      accent: '#3A2A5A',
    },
    {
      id: 2,
      titol: 'Amélie',
      subtitol: 'Jean-Pierre Jeunet · 2001',
      descripcio: 'Màgia quotidiana en cada fotograma. Sempre ens fa riure i plorar alhora.',
      color: '#D8C8B8',
      accent: '#5A3A20',
    },
    {
      id: 3,
      titol: 'Call Me by Your Name',
      subtitol: 'Luca Guadagnino · 2017',
      descripcio: 'Estiu italià que no s\'oblida. Ens va deixar sense paraules.',
      color: '#C0D0C8',
      accent: '#2A4A3A',
    },
    {
      id: 4,
      titol: 'Past Lives',
      subtitol: 'Celine Song · 2023',
      descripcio: 'La vam veure junts i cap dels dos va dir res durant deu minuts.',
      color: '#D0C8D8',
      accent: '#3A2A4A',
    },
  ],
}

function ActivityCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(44,24,16,0.12)' }}
      style={{
        backgroundColor: item.color,
        borderRadius: '20px',
        padding: '28px 28px 26px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        boxShadow: '0 4px 20px rgba(44,24,16,0.06)',
        transition: 'box-shadow 0.25s ease',
        cursor: 'default',
      }}
    >
      {/* Accent dot */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: item.accent,
          marginBottom: '16px',
          opacity: 0.8,
        }}
      />

      <h4
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '1.2rem',
          fontWeight: '400',
          color: '#2C1810',
          marginBottom: '4px',
          lineHeight: 1.25,
        }}
      >
        {item.titol}
      </h4>

      <span
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.73rem',
          fontWeight: '500',
          color: item.accent,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '14px',
          display: 'block',
        }}
      >
        {item.subtitol}
      </span>

      <p
        style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.87rem',
          fontWeight: '300',
          color: '#5A3E35',
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}
      >
        {item.descripcio}
      </p>
    </motion.div>
  )
}

export default function Activities() {
  const [activeTab, setActiveTab] = useState('viatges')
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-60px' })
  const items = ACTIVITIES[activeTab] ?? []

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
          marginBottom: '12px',
        }}
      >
        Les nostres activitats
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          textAlign: 'center',
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.88rem',
          fontWeight: '300',
          color: '#7A6055',
          marginBottom: '52px',
          letterSpacing: '0.04em',
        }}
      >
        Tot el que hem fet junts
      </motion.p>

      {/* ── Pestanyes ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '52px',
          flexWrap: 'wrap',
        }}
      >
        {TABS.map(tab => {
          const isActive = activeTab === tab.key
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                padding: '10px 20px',
                borderRadius: '40px',
                border: isActive
                  ? '1.5px solid #C97B5A'
                  : '1.5px solid rgba(44,24,16,0.12)',
                backgroundColor: isActive ? '#C97B5A' : 'transparent',
                color: isActive ? '#fff' : '#7A6055',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.86rem',
                fontWeight: isActive ? '500' : '400',
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'all 0.22s ease',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#C97B5A'
                  e.currentTarget.style.color = '#C97B5A'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(44,24,16,0.12)'
                  e.currentTarget.style.color = '#7A6055'
                }
              }}
            >
              <span style={{ fontSize: '1rem', lineHeight: 1 }}>{tab.icon}</span>
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* ── Grid de targetes animat ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {items.map((item, i) => (
              <ActivityCard key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
