import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  const footerPath = footerMeta.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  
  block.append(footer);
  decorateMaterialSymbols(block)
}

async function decorateMaterialSymbols(element) {
  const dataString = '[data-icon=';
  const allElements = element.getElementsByTagName('p');

  const allMaterialElements = Array.from(allElements).filter(element => {
    return element.innerHTML.trim().startsWith(dataString);
  })

  allMaterialElements.forEach(element => {
    const innerHTML = element.innerHTML.trim();
    const startIndex = innerHTML.indexOf(dataString);

    if (startIndex !== -1) {
      const iconStartIndex = startIndex + dataString.length;
      const iconEndIndex = innerHTML.indexOf(']', iconStartIndex);

      if (iconEndIndex !== -1) {
        const icon = innerHTML.substring(iconStartIndex, iconEndIndex);
        const newSpan = document.createElement('span');
        newSpan.textContent = icon;
        newSpan.classList.add('material-symbols-outlined');

        element.outerHTML = newSpan.outerHTML;
      }
    }
  });
};