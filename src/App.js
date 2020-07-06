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
        start: colors.length > 0 ? (colors[colors.length - 1].hue.start + 60) % 360 : 120,
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
      <div className="max-w-3xl px-2 md:px-4 mx-auto relative">
        <h1 className="text-5xl font-medium leading-none md:text-6xl md:mt-16 block">Color Generator</h1>
        <ul className="flex flex-col space-y-6 mt-12 text-sm md:text-base text-gray-800">
          <li className={styles.listItem}>
            <FaCircle className={`${styles.listDisc} text-green-500`} />
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
            <FaCircle className={`${styles.listDisc} text-blue-500`} />
            <div className={styles.listItemText}>
              Click a color shade to copy its HSL value.

            </div>
          </li>
          <li className={styles.listItem}>
            <FaCircle className={`${styles.listDisc} text-red-500`} />
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
            className="bg-green-500 rounded text-xl mt-12 mb-12 hover:bg-green-600 text-green-100 px-5 py-2 focus:outline-none mr-2"
          >
            {colors.length === 0 ? 'Initialize palette' : 'Add new color'}
          </button>
          {colors.length === 0 && (
          <button
            type="button"
            onClick={() => handleReplace(defaultColors)}
            className="border border-blue-500 rounded text-xl mt-12 mb-12 hover:bg-blue-100 text-blue-500 px-5 py-2 focus:outline-none"
          >
            Generate defaults
          </button>
          )}

          {
            colors.length > 1 && (
            <button
              type="button"
              onClick={deleteAll}
              className="bg-red-500 rounded text-xl mt-12 mb-12 hover:bg-red-600 text-red-100 px-5 py-2 focus:outline-none ml-auto"
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
