// ref: https://github.com/ozh/github-colors/blob/master/colors.json
import COLROS from '../data/colors.json';

export function getLanguageColor(lang) {
  if (COLROS[lang]) {
    return COLROS[lang];
  }

  return undefined;
}
