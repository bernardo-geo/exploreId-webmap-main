export type BaseMap = {
  url: string;
  attribution: string;
};

export type BaseMaps = {
  [key: string]: BaseMap;
};

export const baseMaps: BaseMaps = {
    base: {
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  },
  satélite: {
    url: 'https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=1lbRLmDDEyGexHFbqHPd',
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> contributors'
  },
  urbano: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
};

  /*base: {
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
  },*/



  /*satellite: {
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' +
      '&style=feature:administrative|visibility:off' +
      '&style=feature:poi|visibility:off' +
      '&style=feature:poi.business|visibility:off' +
      '&style=feature:road|element:labels|visibility:off' +
      '&style=feature:transit|visibility:off' +
      '&style=feature:poi|element:geometry|visibility:off' +
      '&style=feature:poi.business|element:geometry|visibility:off',
    attribution: '&copy; <a href="https://www.google.com/permissions/geoguidelines/">Google Maps</a>'
  },*/