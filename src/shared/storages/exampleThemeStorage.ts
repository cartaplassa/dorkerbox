import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type Theme = 'light' | 'dark';

type ThemeStorage = BaseStorage<Theme> & {
  toggle: () => Promise<void>;
  setLight: () => Promise<void>;
  setDark: () => Promise<void>;
};

const storage = createStorage<Theme>('theme-storage-key', 'dark', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const exampleThemeStorage: ThemeStorage = {
  ...storage,
  // TODO: extends your own methods
  toggle: async () => {
    await storage.set(currentTheme => {
      return currentTheme === 'light' ? 'dark' : 'light';
    });
  },
  setLight: async () => await storage.set('light'),
  setDark: async () => await storage.set('dark'),
};

export default exampleThemeStorage;
