import { BaseStorage, createStorage, StorageType, modifyStorage } from '@src/shared/storages/base';
import getURL from '@root/src/utils/getURL';

type Dork = {
  id: number;
  content: string;
};

type Engine = {
  enabled: boolean;
  dorks: Dork[];
};

type DorkCollection = { [key: string]: Engine };

type DorkStorage = BaseStorage<DorkCollection> & {
  addDork: () => Promise<void>;
  removeDork: (id: number) => Promise<void>;
  changeDork: (id: number, newValue: string) => Promise<void>;
  injectDork: (content: string) => void;
};

const dorkEngine = {
  enabled: true,
  dorks: [],
};

const searchEngines = {
  'duckduckgo.com': 'search_form_input',
  'lite.duckduckgo.com': 'placeholder',
  'html.duckduckgo.com': 'placeholder',
  'www.google.com': 'placeholder',
};

const storageTemplate = Object.keys(searchEngines).reduce((obj, engine) => {
  obj[engine] = structuredClone({
    enabled: true,
    dorks: [],
  });
  return obj;
}, {});

const storage = createStorage<DorkCollection>('dork-storage-key', storageTemplate, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const dorkStorage: DorkStorage = {
  ...storage,
  addDork: modifyStorage(storage, draft => {
    const url = getURL();
    draft[url] ??= structuredClone(dorkEngine);
    draft[url].dorks.push({
      id: Date.now(),
      content: '',
    });
  }),
  removeDork: id =>
    modifyStorage(storage, draft => {
      const url = getURL();
      draft[url].dorks = draft[url].dorks.filter((dork: Dork) => dork.id != id);
    })(),
  changeDork: (id, newValue) =>
    modifyStorage(storage, draft => {
      const url = getURL();
      const index = draft[url].dorks.findIndex((dork: Dork) => dork.id == id);
      draft[url].dorks[index].content = newValue;
    })(),
  injectDork: content => {
    const searchEngine = getURL();
    switch (searchEngine) {
      case 'duckduckgo.com': {
        const field = <HTMLInputElement>document.getElementById('search_form_input');
        field.value += ` ${content}`;
        break;
      }
      case 'www.google.com': {
        const field = <HTMLTextAreaElement>document.querySelectorAll('[name="q"]')[0];
        field.innerHTML += ` ${content}`;
        break;
      }
      case 'html.duckduckgo.com':
      case 'lite.duckduckgo.com': {
        const field = <HTMLInputElement>document.querySelectorAll('[name="q"]')[0];
        field.value += ` ${content}`;
        break;
      }
      default:
        console.log('Search engine unrecognized: ', searchEngine, "can't inject query");
    }
  },
};

export default dorkStorage;
