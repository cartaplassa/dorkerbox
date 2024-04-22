import useStorage from '@src/shared/hooks/useStorage';
import dorkStorage from '@src/shared/storages/dorkStorage.ts';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import { getURL } from '@utils/getSE.ts';

import Dork from './Dork';

export default function App() {
  const url = getURL();
  const storage = useStorage(dorkStorage);
  const dorks = storage[url].dorks;
  const theme = useStorage(exampleThemeStorage);

  return (
    // <div className={'dorkerbox dorkerbox--' + searchEngines[url]}>
    <div className={theme == 'light' ? 'dorkerbox' : 'dorkerbox dorkerbox--dark'}>
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
