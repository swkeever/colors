import React, { useState } from 'react';
import {
  FaCircle, FaEdit, FaTrashAlt,
} from 'react-icons/fa';
import config from './config';
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
  editing: false,
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
    const deleteItem = window.confirm(`Are you sure you want to delete ${colors[idx].name}?`);
    if (deleteItem) {
      const newColors = [...colors.slice(0, idx), ...colors.slice(idx + 1)];
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
        <h2 className="text-4xl text-gray-800">
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
        <button
          type="button"
          onClick={handleCreate}
          className="bg-green-500 rounded text-xl mt-12 mb-12 hover:bg-green-600 text-green-100 px-5 py-2 focus:outline-none"
        >
          Add Color
        </button>
      </div>
    </AppContext.Provider>
  );
}

export default App;
