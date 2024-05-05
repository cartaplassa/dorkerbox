import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import themeStorage from '@root/src/shared/storages/themeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { HexColorPicker } from 'react-colorful';
import ReactSlider from 'react-slider';
import dorkStorage, { searchEngines } from '@root/src/shared/storages/dorkStorage';

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

type EngineToggleProps = {
  engine: string;
  getter: boolean;
  setter: (value: boolean) => Promise<void>;
};

const EngineToggle = ({ engine, getter, setter }: EngineToggleProps) => {
  return (
    <div className="engine-toggle" role="presentation" onClick={setter} onKeyDown={setter}>
      <span className="engine-toggle__title">{engine}</span>
      <span className="engine-toggle__icon">{getter ? 'V' : 'X'}</span>
    </div>
  );
};

const Popup = () => {
  const theme = useStorage(themeStorage);
  const dorks = useStorage(dorkStorage);
  const cssVars = {
    '--dorkerbox-text-color': theme.colorScheme === 'light' ? '#000' : '#fff',
    '--dorkerbox-bg-color': theme.colorScheme === 'light' ? '#fff' : '#282c34',
    '--dorkerbox-accent-color': theme.accentColor,
    '--dorkerbox-border-radius': theme.borderRadius,
  } as React.CSSProperties;

  const handleSlider = async value => await themeStorage.setBorderRadius(value);

  return (
    <div className="App" style={cssVars}>
      <header className="App__header">
        DORKERBOX {/* TODO: logo */}
        <img src={logo} className="App__logo" alt="logo" />
        <button className="App__theme-toggler" onClick={themeStorage.toggleColorScheme}>
          Toggle theme
        </button>
        BORDER RADIUS
        <CustomSlider value={theme.borderRadius} onChange={handleSlider} />
        ACCENT COLOR
        <HexColorPicker color={theme.accentColor} onChange={themeStorage.setAccentColor} />
        <input
          type="text"
          defaultValue={theme.accentColor}
          onChange={async e => await themeStorage.setAccentColor(e.target.value)}
        />
        ENGINES
        {searchEngines.map(engine => (
          <EngineToggle
            key={engine}
            engine={engine}
            getter={dorks[engine].enabled}
            setter={async () => await dorkStorage.toggleSearchEngine(engine)}
          />
        ))}
      </header>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
