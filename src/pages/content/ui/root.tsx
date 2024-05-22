import { createRoot } from 'react-dom/client';
import App from '@pages/content/ui/app';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import injectedStyle from './injected.css?inline';
import getURL from '@root/src/utils/getURL';

refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'dorkerbox-root';

const searchEngine = getURL();

try {
  switch (searchEngine) {
    case 'duckduckgo.com': {
      const parentContainer = document.getElementById('header');
      const bar = document.getElementsByClassName('zcm-wrap-wrap')[0];
      parentContainer.insertBefore(root, bar);
      break;
    }
    case 'www.google.com': {
      // Default desktop frontend
      if (document.getElementById('cnt')?.contains(document.getElementById('sfcnt'))) {
        const parentContainer = document.getElementById('cnt');
        const bar = document.getElementById('sfcnt').nextSibling;
        parentContainer.insertBefore(root, bar);
      }
      // Old frontend that opens with custom UA for some reason
      else if (document.getElementById('hdr')) {
        // const parentContainer = document.getElementById('hdr');
        // parentContainer.appendChild(root);
        // Issues w/ injecting text, google.log etc. is not a function
      }
      // Mobile frontend
      else if (document.getElementsByTagName('header')) {
        const parentContainer = document.getElementsByTagName('header')[0];
        parentContainer.appendChild(root);
      } else {
        console.log("Can't inject root in google");
      }
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
} catch (e) {
  if (e instanceof TypeError) {
    console.log("Can't inject root at", searchEngine);
  } else {
    console.log('Unknown error.');
  }
  console.log(e.message);
}

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

/** Inject styles into shadow dom */
const styleElement = document.createElement('style');
styleElement.textContent = injectedStyle;
shadowRoot.appendChild(styleElement);

/**
 * https://github.com/Jonghakseo/chrome-extension-boilerplate-react-vite/pull/174
 *
 * In the firefox environment, the adoptedStyleSheets bug may prevent contentStyle from being applied properly.
 * Please refer to the PR link above and go back to the contentStyle.css implementation, or raise a PR if you have a better way to improve it.
 */

createRoot(rootIntoShadow).render(<App />);
