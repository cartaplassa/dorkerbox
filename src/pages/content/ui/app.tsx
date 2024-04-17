import useStorage from '@src/shared/hooks/useStorage';
import dorkStorage from '@src/shared/storages/dorkStorage.ts';
import { getURL } from '@utils/getSE.ts';

import Dork from './Dork.tsx';

const searchEngines = {
  'duckduckgo.com': 'ddg',
};

export default function App() {
  const url = getURL();
  const storage = useStorage(dorkStorage);
  const dorks = storage[url].dorks;

  return (
    <div className={'dorkerbox dorkerbox--' + searchEngines[url]}>
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
