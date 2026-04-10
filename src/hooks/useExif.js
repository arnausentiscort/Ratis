// Hook per llegir metadades EXIF d'una foto
// Extreu: lat, lng (GPS), data (DateTimeOriginal), lloc (coords formatades)
// Si la foto no té EXIF o hi ha error, retorna tot null sense trencar res.

import { useState, useEffect } from 'react'
import exifr from 'exifr'

function formatData(date) {
  if (!(date instanceof Date) || isNaN(date)) return null
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

function formatLloc(lat, lng) {
  if (lat == null || lng == null) return null
  const latStr = `${Math.abs(lat).toFixed(2)}°\u202f${lat >= 0 ? 'N' : 'S'}`
  const lngStr = `${Math.abs(lng).toFixed(2)}°\u202f${lng >= 0 ? 'E' : 'W'}`
  return `${latStr}, ${lngStr}`
}

export function useExif(src) {
  const [state, setState] = useState({
    lat: null,
    lng: null,
    data: null,
    lloc: null,
    loading: true,
  })

  useEffect(() => {
    if (!src) {
      setState({ lat: null, lng: null, data: null, lloc: null, loading: false })
      return
    }

    let cancelled = false

    exifr
      .parse(src, { gps: true, pick: ['DateTimeOriginal'] })
      .then((result) => {
        if (cancelled) return
        if (!result) {
          setState({ lat: null, lng: null, data: null, lloc: null, loading: false })
          return
        }
        const lat = result.latitude ?? null
        const lng = result.longitude ?? null
        const data = formatData(result.DateTimeOriginal)
        const lloc = formatLloc(lat, lng)
        setState({ lat, lng, data, lloc, loading: false })
      })
      .catch(() => {
        if (!cancelled)
          setState({ lat: null, lng: null, data: null, lloc: null, loading: false })
      })

    return () => {
      cancelled = true
    }
  }, [src])

  return state
}
