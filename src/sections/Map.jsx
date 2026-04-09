// Sección Map — mapa interactiu amb llocs visitats

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

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

const llocs = [
  {
    nom: 'Barcelona',
    coords: [41.3851, 2.1734],
    descripcio: 'Casa nostra. La ciutat on tot va començar.',
  },
  {
    nom: 'París',
    coords: [48.8566, 2.3522],
    descripcio: 'Passejant per la vora del Sena al capvespre.',
  },
  {
    nom: 'Roma',
    coords: [41.9028, 12.4964],
    descripcio: 'Vam llançar una moneda a la Fontana di Trevi.',
  },
  {
    nom: 'Lisboa',
    coords: [38.7169, -9.1395],
    descripcio: 'Tramvies, pastéis de nata i el Tajo al fons.',
  },
  {
    nom: 'Amsterdam',
    coords: [52.3676, 4.9041],
    descripcio: 'Canals, bicicletes i tulipes a tot arreu.',
  },
]

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

          {llocs.map((lloc) => (
            <Marker key={lloc.nom} position={lloc.coords} icon={terracottaIcon}>
              <Popup className="ratis-popup">
                <strong
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#2C1810',
                    marginBottom: '5px',
                  }}
                >
                  {lloc.nom}
                </strong>
                <span
                  style={{
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.82rem',
                    color: '#7A6055',
                    lineHeight: 1.5,
                  }}
                >
                  {lloc.descripcio}
                </span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </section>
  )
}
