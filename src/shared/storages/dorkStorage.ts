import { produce } from 'immer';
import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
import { getURL } from '@utils/getSE';

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
};

const dorkEngine = {
  enabled: true,
  dorks: [],
};

const searchEngines = {
  'duckduckgo.com': 'search_form_input',
  'lite.duckduckgo.com': 'placeholder',
  'html.duckduckgo.com': 'placeholder',
  'google.com': 'placeholder',
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
  addDork: async () => {
    await storage.set(
      produce(draft => {
        const url = getURL();
        if (!draft[url]) {
          draft[url] = structuredClone(dorkEngine);
        }
        draft[url].dorks.push({
          id: Date.now(),
          content: '',
        });
      }),
    );
  },
  removeDork: async id => {
    await storage.set(
      produce(draft => {
        const url = getURL();
        if (!draft[url]) {
          draft[url] = structuredClone(dorkEngine);
        }
        draft[url].dorks = draft[url].dorks.filter((dork: Dork) => dork.id != id);
      }),
    );
  },
  changeDork: async (id, newValue) => {
    await storage.set(
      produce(draft => {
        const url = getURL();
        if (!draft[url]) {
          draft[url] = structuredClone(dorkEngine);
        }
        const index = draft[url].dorks.findIndex((dork: Dork) => dork.id == id);
        draft[url].dorks[index].content = newValue;
      }),
    );
  },
  injectDork: content => {
    const url = getURL();
    const field = document.getElementById(searchEngines[url]);
    field.value += ` ${content}`;
  },
};

export default dorkStorage;
