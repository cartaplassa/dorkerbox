import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import themeStorage from '@root/src/shared/storages/themeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { HexColorPicker } from 'react-colorful';
import ReactSlider from 'react-slider';

type CustomSliderProps = {
  value: number;
  onChange: (value: number) => Promise<void>;
};

const CustomSlider = ({ value, onChange }: CustomSliderProps) => (
  <ReactSlider
    className="slider"
    thumbClassName="slider__thumb"
    trackClassName="slider__track"
    min={0}
    max={175}
    defaultValue={0}
    value={value}
    onChange={onChange}
  />
);

const Popup = () => {
  const theme = useStorage(themeStorage);
  const cssVars = {
    backgroundColor: theme.colorScheme === 'light' ? '#fff' : '#000',
    '--dorkerbox-accent-color': theme.accentColor,
    '--dorkerbox-border-radius': theme.borderRadius,
  } as React.CSSProperties;
  const buttonColorSchemeAwareStyle = {
    backgroundColor: theme.colorScheme === 'light' ? '#fff' : '#000',
    color: theme.colorScheme === 'light' ? '#000' : '#fff',
  };

  return (
    <div className="App" style={cssVars}>
      <header
        className="App__header"
        style={{
          color: theme.colorScheme === 'light' ? '#000' : '#fff',
        }}>
        DORKERBOX {/* TODO: logo */}
        <img src={logo} className="App__logo" alt="logo" />
        <button
          className="App__theme-toggler"
          style={buttonColorSchemeAwareStyle}
          onClick={themeStorage.toggleColorScheme}>
          Toggle theme
        </button>
        BORDER RADIUS
        <CustomSlider value={theme.borderRadius} onChange={async value => await themeStorage.setBorderRadius(value)} />
        ACCENT COLOR
        <HexColorPicker color={theme.accentColor} onChange={themeStorage.setAccentColor} />
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
