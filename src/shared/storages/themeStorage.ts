import { Immutable } from 'immer';
import { BaseStorage, createStorage, StorageType, modifyStorage } from '@src/shared/storages/base';

type Theme = 'light' | 'dark';

type StorageObject = Immutable<{
  colorScheme: Theme;
  accentColor: string;
  borderRadius: number;
}>;

type ThemeStorage = BaseStorage<StorageObject> & {
  toggleColorScheme: () => Promise<void>;
  setLightColorScheme: () => Promise<void>;
  setDarkColorScheme: () => Promise<void>;
  setAccentColor: (newAccentColor: string) => Promise<void>;
  setBorderRadius: (newBorderRadius: number) => Promise<void>;
};

const initialStorage: StorageObject = {
  colorScheme: 'dark',
  accentColor: '#ffa500',
  borderRadius: 50,
};

const storage = createStorage<StorageObject>('theme-storage-key', initialStorage, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const themeStorage: ThemeStorage = {
  ...storage,
  toggleColorScheme: modifyStorage(storage, draft => {
    draft.colorScheme = draft.colorScheme === 'light' ? 'dark' : 'light';
  }),
  setLightColorScheme: modifyStorage(storage, draft => {
    draft.colorScheme = 'light';
  }),
  setDarkColorScheme: modifyStorage(storage, draft => {
    draft.colorScheme = 'dark';
  }),
  setAccentColor: newAccentColor =>
    modifyStorage(storage, draft => {
      draft.accentColor = newAccentColor;
    })(),
  setBorderRadius: newBorderRadius =>
    modifyStorage(storage, draft => {
      draft.borderRadius = newBorderRadius;
    })(),
};

export default themeStorage;
