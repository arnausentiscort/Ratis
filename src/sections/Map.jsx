// Map — mapa interactiu. Clic en un pin → panel lateral amb foto gran + info EXIF.
// Si una foto no té GPS, no apareix al mapa però sí al mural.

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { photos } from '../data/photos'
import { useExif } from '../hooks/useExif'

const terracottaIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24C24 5.37 18.63 0 12 0z"
        fill="#C97B5A" stroke="#fff" stroke-width="1.5"/>
      <circle cx="12" cy="12" r="4.5" fill="#fff" opacity="0.9"/>
    </svg>
  `)}`,
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -38],
})

function formatDataDisplay(dataStr) {
  if (!dataStr) return null
  const [year, month] = dataStr.split('-')
  const mesos = ['Gener','Febrer','Març','Abril','Maig','Juny',
                  'Juliol','Agost','Setembre','Octubre','Novembre','Desembre']
  return `${mesos[parseInt(month, 10) - 1]} ${year}`
}

// ── Pin individual: només renderitza si té GPS ──
function PhotoMarker({ photo, onSelect }) {
  const { lat, lng } = useExif(photo.src)
  if (!lat || !lng) return null
  return (
    <Marker
      position={[lat, lng]}
      icon={terracottaIcon}
      eventHandlers={{ click: () => onSelect(photo) }}
    />
  )
}

// ── Panel lateral que s'obre en clicar un pin ──
function PhotoPanel({ photo, onClose }) {
  const { data, lloc } = useExif(photo.src)
  const [imgError, setImgError] = useState(false)

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(44,24,16,0.38)',
          zIndex: 1000,
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
        }}
      />

      {/* Panel */}
      <motion.aside
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 'min(420px, 100vw)',
          height: '100vh',
          backgroundColor: '#FAF8F4',
          boxShadow: '-8px 0 56px rgba(44,24,16,0.14)',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Foto gran */}
        <div
          style={{
            height: '52vh',
            backgroundColor: '#E8C5B8',
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {!imgError && (
            <img
              src={photo.src}
              alt={lloc ?? ''}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}

          {/* Gradient sobre la foto */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom,rgba(0,0,0,0.0) 55%,rgba(44,24,16,0.45) 100%)',
            }}
          />

          {/* Botó tancar */}
          <button
            onClick={onClose}
            aria-label="Tancar"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: 'rgba(0,0,0,0.35)',
              color: '#fff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {/* Informació */}
        <div
          style={{
            padding: '32px 36px',
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
          }}
        >
          {/* Lloc */}
          <h3
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.6rem',
              fontWeight: '400',
              color: '#2C1810',
              lineHeight: 1.2,
              marginBottom: '8px',
            }}
          >
            {lloc ?? 'Sense ubicació'}
          </h3>

          {/* Data */}
          {data && (
            <span
              style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.8rem',
                fontWeight: '400',
                color: '#C97B5A',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                display: 'block',
              }}
            >
              {formatDataDisplay(data)}
            </span>
          )}

          {/* Separador */}
          <div
            style={{
              width: '40px',
              height: '1.5px',
              backgroundColor: '#E8C5B8',
              marginBottom: '20px',
            }}
          />

          {/* Descripció */}
          <p
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.95rem',
              fontWeight: '300',
              color: '#5A3E35',
              lineHeight: 1.75,
              margin: 0,
            }}
          >
            {photo.descripcio}
          </p>
        </div>
      </motion.aside>
    </>,
    document.body
  )
}

const mapStyles = `
  .ratis-map .leaflet-container {
    font-family: 'DM Sans', sans-serif;
    cursor: crosshair;
  }
  .ratis-map .leaflet-marker-icon {
    cursor: pointer !important;
    transition: transform 0.18s ease;
  }
  .ratis-map .leaflet-marker-icon:hover {
    transform: scale(1.25) translateY(-4px) !important;
    filter: drop-shadow(0 6px 12px rgba(201,123,90,0.5));
  }
`

export default function Map() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState(null)

  return (
    <section style={{ backgroundColor: '#F5F1EA', padding: '100px 48px' }}>
      <style>{mapStyles}</style>

      <motion.h2
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          textAlign: 'center',
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
          fontWeight: '400',
          color: '#2C1810',
          letterSpacing: '0.02em',
          marginBottom: '16px',
        }}
      >
        On hem estat
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
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
        Clica un pin per veure la foto
      </motion.p>

      <motion.div
        className="ratis-map"
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 12px 48px rgba(44,24,16,0.10)',
        }}
      >
        <MapContainer
          center={[48, 10]}
          zoom={4}
          minZoom={2}
          maxZoom={10}
          style={{ height: '520px', width: '100%' }}
          scrollWheelZoom={false}
          zoomControl={true}
          worldCopyJump={false}
          maxBounds={[[-85, -180], [85, 180]]}
          maxBoundsViscosity={0.8}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          {photos.map(photo => (
            <PhotoMarker key={photo.id} photo={photo} onSelect={setSelected} />
          ))}
        </MapContainer>
      </motion.div>

      {/* Panel lateral (portal → document.body) */}
      <AnimatePresence>
        {selected && (
          <PhotoPanel photo={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
