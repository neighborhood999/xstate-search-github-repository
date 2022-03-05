import { getLanguageColor } from '../colors';

describe('getLanguageColor', () => {
  it('should get JavaScript language color', () => {
    expect(getLanguageColor('JavaScript')).toEqual({ color: '#f1e05a' });
    expect(getLanguageColor('TypeScript')).toEqual({ color: '#2b7489' });
    expect(getLanguageColor('Rust')).toEqual({ color: '#dea584' });
  });

  it('should return undefined when language color not found', () => {
    expect(getLanguageColor('FooBarBar')).toBeUndefined();
  });
});
