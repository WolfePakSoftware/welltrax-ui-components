// jsdom drops var() and color-mix() from computed style, so read the rule text styled-components injected.
// Stylis strips the space after commas; it is put back so expectations match the source.
export const styledRule = (element: Element, selectorSuffix = ''): string => {
  const css = Array.from(document.querySelectorAll('style'))
    .map(style => style.textContent)
    .join('');
  const suffix = selectorSuffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return Array.from(element.classList)
    .map(
      name =>
        css.match(new RegExp(`\\.${name}${suffix}[^{]*\\{[^}]*\\}`, 'g')) || []
    )
    .reduce((all, rules) => all.concat(rules), [] as string[])
    .join('')
    .replace(/,(?! )/g, ', ');
};
