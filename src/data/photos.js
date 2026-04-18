// Sistema de dades central de Ratis
// Per afegir una foto: copia la imatge a public/photos/ i afegeix una entrada aquí.
// lloc, data, lat i lng es llegeixen automàticament dels metadades EXIF.

export const photos = [
  {
    id: 1,
    src: '/Ratis/photos/torre.JPG',
    descripcio: 'El port de Torredembarra, la nostra platja.',
  },
  {
    id: 2,
    src: '/Ratis/photos/cordoba.JPG',
    descripcio: 'Escapada al sud, perduts pels carrers de Còrdova.',
  },
  {
    id: 3,
    src: '/Ratis/photos/gorrita.JPG',
    descripcio: 'Les nostres cares, molt juntetes.',
  },
  {
    id: 4,
    src: '/Ratis/photos/padelsurf.JPG',
    descripcio: 'Padelsurf a Eivissa, estiu pur.',
  },
  {
    id: 5,
    src: '/Ratis/photos/forky.JPG',
    descripcio: 'Fent el tonto a l\'ascensor amb el Forky.',
  },
]
