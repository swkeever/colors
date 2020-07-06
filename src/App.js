import React, { useState } from 'react';
import ColorPalette from './components/ColorPalette';
import { getInitialColors, defaultColors } from './utils/colors';
import config from './utils/config';

export const APP_DATA_KEY = 'appData';
export const AppContext = React.createContext();

function App() {
  const [colors, setColors] = useState(getInitialColors());

  function handleCreate() {
    const newColors = colors.concat({
      name: 'Click to name',
      hue: {
        start: colors.length > 0
          ? (colors[colors.length - 1].hue.start + 60) % 360
          : Math.floor(Math.random() * config.hue.max),
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
      editing: true,
    });
    localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
    setColors(newColors);
  }

  function handleReplace(newColors) {
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
    const deleteItem = window.confirm(`Are you sure you want to delete ${colors[idx].name}?`);
    if (deleteItem) {
      const newColors = [...colors.slice(0, idx), ...colors.slice(idx + 1)];
      localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
      setColors(newColors);
    }
  }

  function deleteAll() {
    const deleteItems = window.confirm('Are you sure you want to delete all colors?');
    if (deleteItems) {
      const newColors = [];
      localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
      setColors(newColors);
    }
  }

  const styles = {
    button: `
    rounded 
    md:text-xl 
    my-4 
    px-5 py-2 
    focus:outline-none 
    `,
  };

  return (
    <AppContext.Provider
      value={{
        colors,
        handleCreate,
        handleUpdate,
        handleDelete,
      }}
    >
      <div className="max-w-3xl mt-4 px-2 md:px-4 mx-auto relative">
        <ColorPalette />
        {!colors.length && (
        <h2 className="text-xl md:text-4xl text-gray-800">
          <span
            role="img"
            aria-label="pointing down"
            className="mr-4 text-2xl md:text-5xl"
          >
            👇
          </span>
          Click to get started!
        </h2>
        )}
        <div className={`flex mb-8 ${colors.length > 0 && 'mt-8'}`}>
          <button
            type="button"
            onClick={handleCreate}
            className={`${styles.button} bg-blue-500 hover:bg-blue-600 text-blue-100`}
          >
            {colors.length === 0 ? 'Initialize palette' : 'Add new color'}
          </button>
          {colors.length === 0 && (
          <button
            type="button"
            onClick={() => handleReplace(defaultColors)}
            className={`${styles.button} ml-4 border-blue-400 border hover:bg-blue-100 hover:text-blue-600 text-blue-500`}
          >
            Generate defaults
          </button>
          )}

          {
            colors.length > 1 && (
            <button
              type="button"
              onClick={deleteAll}
              className={`${styles.button} hover:bg-red-100 border border-red-400 hover:text-red-600 text-red-500 ml-auto`}
            >
              Delete all
            </button>
            )
          }
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
