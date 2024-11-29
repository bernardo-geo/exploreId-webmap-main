import { POIType } from '../types';
import { categories } from '../../config/categories';

const categoryGroups = categories.reduce((acc, category) => {
  acc[category.id] = category.group;
  return acc;
}, {} as Record<string, string>);

export const getPOIType = (category: string): POIType => {
  const group = categoryGroups[category];
  return group === 'embaixador' ? 'embaixador' : 'ponto-interesse';
};