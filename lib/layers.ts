import type { LayerProps } from 'react-map-gl/maplibre';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'cases',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': [
      'step',
      ['get', 'point_count'],
      '#fdac39',
      5,
      '#fc9923',
      10,
      '#f77409'
    ],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      3,
      2
    ],
    'circle-stroke-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#000',
      '#fff'
    ]
  }
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'cases',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'cases',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-opacity': 0.8,
    'circle-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#19634d',
      '#164f3e'
    ],

    'circle-radius': 8,
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      1,
      2
    ],
    'circle-stroke-color': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      '#164f3e',
      '#fff'
    ]
  }
};
