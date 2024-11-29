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

