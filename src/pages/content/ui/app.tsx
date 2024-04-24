import useStorage from '@src/shared/hooks/useStorage';
import dorkStorage from '@src/shared/storages/dorkStorage.ts';
import themeStorage from '@root/src/shared/storages/themeStorage';
import getURL from '@root/src/utils/getURL';

import Dork from './Dork';

export default function App() {
  const url = getURL();
  const storage = useStorage(dorkStorage);
  const dorks = storage[url].dorks;
  const theme = useStorage(themeStorage);
  const cssVars = {
    '--dorkerbox-accent-color': theme.accentColor,
    '--dorkerbox-border-radius': theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div className={theme.colorScheme == 'light' ? 'dorkerbox' : 'dorkerbox dorkerbox--dark'} style={cssVars}>
      <div className="dorkerbox__inner">
        {dorks.map(dork => (
          <Dork key={dork.id} content={dork.content} id={dork.id} />
        ))}
        <button className="dorkerbox__add button" onClick={dorkStorage.addDork}>
          +
        </button>
      </div>
    </div>
  );
}
