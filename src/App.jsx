import Hero from './sections/Hero'
import Mural from './sections/Mural'
import Map from './sections/Map'
import Activities from './sections/Activities'
import Timeline from './sections/Timeline'
import Favorites from './sections/Favorites'

export default function App() {
  return (
    <>
      {/* Hero — slideshow fullscreen */}
      <Hero />

      {/* Mural — galeria masonry */}
      <Mural />

      {/* Map — mapa amb panel lateral */}
      <Map />

      {/* Activities — pestanyes d'activitats */}
      <Activities />

      {/* Timeline — la nostra història */}
      <Timeline />

      {/* Favorits — pel·lícules, música i llocs */}
      <Favorites />
    </>
  )
}
