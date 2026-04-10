// Sección Map — mapa interactiu amb llocs visitats
// Els pins es generen automàticament a partir del GPS dels metadades EXIF.
// Si una foto no té GPS, no apareix al mapa però sí al mural.

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { photos } from '../data/photos'
import { useExif } from '../hooks/useExif'

// Pin personalitzat terracota
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
  const mesos = ['Gen', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun',
                  'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Des']
  return `${mesos[parseInt(month, 10) - 1]} ${year}`
}

// Component per cada pin — només renderitza si té GPS
function PhotoMarker({ photo }) {
  const { lat, lng, data, lloc } = useExif(photo.src)
  const [imgError, setImgError] = useState(false)

  if (!lat || !lng) return null

  return (
    <Marker position={[lat, lng]} icon={terracottaIcon}>
      <Popup className="ratis-popup">
        <div style={{ minWidth: '180px' }}>
          {/* Imatge — placeholder gris si el fitxer no existeix */}
          <div
            style={{
              width: '100%',
              height: '110px',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '10px',
              backgroundColor: '#E8C5B8',
            }}
          >
            {!imgError && (
              <img
                src={photo.src}
                alt={lloc ?? ''}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
          </div>

          {/* Lloc: coordenades del EXIF */}
          <strong
            style={{
              display: 'block',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              fontWeight: '500',
              color: '#2C1810',
              marginBottom: '2px',
            }}
          >
            {lloc}
          </strong>

          {/* Data del EXIF */}
          {data && (
            <span
              style={{
                display: 'block',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                color: '#C97B5A',
                marginBottom: '5px',
                letterSpacing: '0.06em',
              }}
            >
              {formatDataDisplay(data)}
            </span>
          )}

          {/* Descripció manual */}
          <span
            style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.82rem',
              color: '#7A6055',
              lineHeight: 1.5,
            }}
          >
            {photo.descripcio}
          </span>
        </div>
      </Popup>
    </Marker>
  )
}

const mapStyles = `
  .ratis-map .leaflet-container {
    font-family: 'DM Sans', sans-serif;
  }
  .ratis-popup .leaflet-popup-content-wrapper {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(44,24,16,0.10);
    padding: 0;
    border: none;
  }
  .ratis-popup .leaflet-popup-content {
    margin: 0;
    padding: 16px 20px;
    min-width: 180px;
  }
  .ratis-popup .leaflet-popup-tip {
    background: #fff;
  }
  .ratis-popup .leaflet-popup-close-button {
    color: #ccc;
    font-size: 18px;
    top: 8px;
    right: 10px;
  }
  .ratis-popup .leaflet-popup-close-button:hover {
    color: #C97B5A;
  }
`

export default function Map() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      style={{
        backgroundColor: '#F5F1EA',
        padding: '100px 48px',
      }}
    >
      <style>{mapStyles}</style>

      {/* Títol */}
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
          marginBottom: '56px',
        }}
      >
        On hem estat
      </motion.h2>

      {/* Targeta del mapa */}
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
          style={{ height: '500px', width: '100%' }}
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

          {photos.map((photo) => (
            <PhotoMarker key={photo.id} photo={photo} />
          ))}
        </MapContainer>
      </motion.div>
    </section>
  )
}
