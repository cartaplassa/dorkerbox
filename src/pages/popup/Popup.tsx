import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import themeStorage from '@root/src/shared/storages/themeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { HexColorPicker } from 'react-colorful';
import ReactSlider from 'react-slider';

const Popup = () => {
  const theme = useStorage(themeStorage);
  const cssVars = {
    backgroundColor: theme.colorScheme === 'light' ? '#fff' : '#000',
    '--dorkerbox-accent-color': theme.accentColor,
    '--dorkerbox-border-radius': theme.borderRadius,
  } as React.CSSProperties;

  return (
    <div className="App" style={cssVars}>
      <header className="App-header" style={{ color: theme.colorScheme === 'light' ? '#000' : '#fff' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <button
          style={{
            backgroundColor: theme.colorScheme === 'light' ? '#fff' : '#000',
            color: theme.colorScheme === 'light' ? '#000' : '#fff',
          }}
          onClick={themeStorage.toggleColorScheme}>
          Toggle theme
        </button>
        <HexColorPicker color={theme.accentColor} onChange={themeStorage.setAccentColor} />
        <ReactSlider
          className="slider"
          thumbClassName="slider__thumb"
          trackClassName="slider__track"
          min={0}
          max={175}
          defaultValue={theme.borderRadius}
          value={theme.borderRadius}
          onChange={async value => await themeStorage.setBorderRadius(value)}
        />
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
