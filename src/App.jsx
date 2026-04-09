import Hero from './sections/Hero'
import Mural from './sections/Mural'
import Map from './sections/Map'
import Timeline from './sections/Timeline'
import Favorites from './sections/Favorites'

export default function App() {
  return (
    <>
      {/* Hero — pantalla de benvinguda */}
      <Hero />

      {/* Mural — galeria de fotos */}
      <Mural />

      {/* Map — mapa de llocs visitats */}
      <Map />

      {/* Timeline — la nostra història */}
      <Timeline />

      {/* Favorits — pel·lícules, música i llocs */}
      <Favorites />
    </>
  )
}
