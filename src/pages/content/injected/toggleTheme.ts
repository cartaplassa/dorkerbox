// Function that fires after every page update,
// might come in handy.

// import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';

refreshOnUpdate('pages/content/injected/toggleTheme');

async function toggleTheme() {
  // console.log('Theme: ', await exampleThemeStorage.get());
  // if (window.matchMedia) {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     await exampleThemeStorage.setDark()
  //   }
  // }
}

void toggleTheme();
