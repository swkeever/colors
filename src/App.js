import React, { useState } from 'react';
import {
  FaCircle, FaEdit, FaTrashAlt,
} from 'react-icons/fa';
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
    listDisc: `
    w-1/12
    text-2xl
    my-auto
    mr-2
    `,

    listItem: `
    flex
    `,

    listItemText: `
    w-11/12
    `,

    inlineIcon: `
    inline
    text-xl
    text-gray-700
    mb-1
    `,

    button: `
    rounded 
    md:text-xl 
    my-4 
    px-5 py-2 
    focus:outline-none 
    mr-2
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
        <h1 className="text-3xl font-bold leading-none md:text-6xl md:mt-16 block">
          <span className="text-blue-700">Color</span>
          {' '}
          <span className="text-blue-900">S</span>
          <span className="text-blue-800">h</span>
          <span className="text-blue-700">a</span>
          <span className="text-blue-600">d</span>
          <span className="text-blue-500">e</span>
          <span className="text-blue-400">s</span>

          {' '}
          <span className="text-blue-600">Generator</span>

        </h1>
        <h2 className="mt-8 md:mt-12 font-medium text-gray-700 text-lg">Getting Started</h2>
        <ul className="flex bg-gray-100 py-8 flex-col mt-1 rounded space-y-6 text-sm md:text-base text-gray-600">
          <li className={styles.listItem}>
            <FaCircle className={`${styles.listDisc} text-blue-500`} />
            <div className={styles.listItemText}>
              Click the
              {' '}
              <FaEdit
                title="Pencil icon"
                className={styles.inlineIcon}
              />
              {' '}
              to edit and the
              {' '}
              <FaTrashAlt
                title="Trashcan icon"
                className={styles.inlineIcon}
              />
              {' '}
              to delete a color.

            </div>
          </li>
          <li className={styles.listItem}>
            <FaCircle className={`${styles.listDisc} text-blue-400`} />
            <div className={styles.listItemText}>
              Click a color shade to copy its HSL value.

            </div>
          </li>
          <li className={styles.listItem}>
            <FaCircle className={`${styles.listDisc} text-blue-300`} />
            <div className={styles.listItemText}>
              Your work is automatically saved to your browser&apos;s local storage.
            </div>
          </li>
        </ul>
        <ColorPalette />
        {!colors.length && (
        <h2 className="text-3xl md:text-4xl text-gray-800">
          <span
            role="img"
            aria-label="pointing down"
            className="mr-4 text-5xl"
          >
            👇
          </span>
          Click to get started!
        </h2>
        )}
        <div className="flex">
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
            className={`${styles.button} border-blue-400 border hover:bg-blue-100 hover:text-blue-600 text-blue-500`}
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
