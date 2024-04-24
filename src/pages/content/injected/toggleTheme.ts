// Function that fires after every page update,
// might come in handy.

// import themeStorage from '@src/shared/storages/themeStorage';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content/injected/toggleTheme');

async function toggleTheme() {
  // console.log('Theme: ', (await themeStorage.get()).colorScheme);
  // if (window.matchMedia) {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     await themeStorage.setDark()
  //   }
  // }
  // await themeStorage.toggleColorScheme();
  // console.log('New: ', (await themeStorage.get()).colorScheme);
}

void toggleTheme();
