import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import { getURL } from '@utils/getSE.ts';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'dorkerbox-root';

const searchEngine = getURL();

switch (searchEngine) {
  case 'duckduckgo.com': {
    const parentContainer = document.getElementById('header');
    const bar = document.getElementsByClassName('zcm-wrap-wrap')[0];
    parentContainer.insertBefore(root, bar);
    break;
  }
  case 'www.google.com': {
    const parentContainer = document.getElementById('searchform');
    parentContainer.appendChild(root);
    document.getElementById('cnt').style.paddingTop = 'calc(20px + 4em)';
    break;
  }
  case 'html.duckduckgo.com': {
    const parentContainer = document.getElementsByClassName('header__form')[0];
    const bar = document.getElementsByClassName('frm__select')[0];
    parentContainer.insertBefore(root, bar);
    break;
  }
  case 'lite.duckduckgo.com': {
    const parentContainer = document.getElementsByTagName('form')[0];
    const bar = document.getElementsByClassName('filters')[0];
    parentContainer.insertBefore(root, bar);
    break;
  }
  default:
    console.log('Search engine unrecognized: ', searchEngine, "can't inject root");
}

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.innerHTML = injectedStyle;
shadowRoot.appendChild(styleElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(<App />);
