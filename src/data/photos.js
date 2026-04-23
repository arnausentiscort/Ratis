// Sistema de dades central de Ratis
// Per afegir una foto: copia la imatge a public/photos/ i afegeix una entrada aquí.
// lloc, data, lat i lng es llegeixen automàticament dels metadades EXIF.

export const photos = [
  {
    id: 1,
    src: '/Ratis/photos/torre.JPG',
    descripcio: 'El port de Torredembarra, la nostra platja.',
    lloc: 'Torredembarra, Tarragona',
  },
  {
    id: 2,
    src: '/Ratis/photos/cordoba.jpg',
    descripcio: 'Escapada al sud, perduts pels carrers de Còrdova.',
    lloc: 'Còrdova, Andalusia',
  },
  {
    id: 3,
    src: '/Ratis/photos/gorrita.jpg',
    descripcio: 'Les nostres cares, molt juntetes.',
    lloc: 'Barcelona',
  },
  {
    id: 4,
    src: '/Ratis/photos/padelsurf.jpg',
    descripcio: 'Padelsurf a Eivissa, estiu pur.',
    lloc: 'Eivissa, Illes Balears',
  },
  {
    id: 5,
    src: '/Ratis/photos/forky.jpg',
    descripcio: 'Fent el tonto a l\'ascensor amb el Forky.',
    lloc: 'Barcelona',
  },
]
