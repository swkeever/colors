import React, { useState } from 'react';
import config from './config';
import CreateButton from './components/CreateButton';
import Title from './components/Title';
import ColorPalette from './components/ColorPalette';

const APP_DATA_KEY = 'appData';
export const AppContext = React.createContext();

const getRandomColor = () => ({
  name: 'Click to name',
  hue: {
    start: Math.floor(Math.random() * config.hue.max),
    range: 10,
  },
  saturation: {
    a: config.saturation.a.max / 2,
    b: config.saturation.b.max / 2,
    c: config.saturation.c.max / 2,
  },
  lightness: {
    start: config.lightness.min,
    range: 100,
  },
});

function getInitialColors() {
  const appData = localStorage.getItem(APP_DATA_KEY);
  if (appData) {
    return JSON.parse(appData);
  }
  return [getRandomColor()];
}

function App() {
  const [colors, setColors] = useState(getInitialColors());

  function handleCreate() {
    const newColors = colors.concat(getRandomColor());
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
    setColors(newColors);
  }

  function handleUpdate(idx, newColor) {
    const newColors = Array.from(colors);
    newColors[idx] = newColor;
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
    setColors(newColors);
  }

  function handleDelete(idx) {
    const newColors = [...colors.slice(0, idx), ...colors.slice(idx + 1)];
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
    setColors(newColors);
  }

  return (
    <AppContext.Provider
      value={{
        colors,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      <div className="max-w-3xl mx-auto relative font-mono">
        <Title />
        <ColorPalette />
        <CreateButton />
      </div>
    </AppContext.Provider>
  );
}

export default App;
