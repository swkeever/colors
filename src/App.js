import React, { useState } from 'react';
import { FaCopy, FaTrashAlt } from 'react-icons/fa';
import generateShades from './shades';
import config from './config';

const APP_DATA_KEY = 'appData';

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

  const palette = colors.map((color, idx) => {
    const shades = generateShades(color);

    function handleUpdate(newColor) {
      const newColors = Array.from(colors);
      newColors[idx] = newColor;
      localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
      setColors(newColors);
    }

    function handleDelete() {
      const newColors = [...colors.slice(0, idx), ...colors.slice(idx + 1)];
      localStorage.setItem(APP_DATA_KEY, JSON.stringify(newColors));
      setColors(newColors);
    }

    const styles = {
      input: `
      bg-gray-200
      ml-1
      rounded
      px-1
      w-40
      cursor-pointer
      bg-blue-500
      `,

      control: `
      flex 
      space-x-8
      ml-auto
      text-gray-700
      `,

      controlHeader: `
      text-gray-800
      text-2xl
      font-medium
      `,
    };

    return (
      <li key={`color-${idx}`}>
        <div className="flex justify-between mb-2">
          <h2 className="text-4xl text-gray-900">
            <input
              onClick={(e) => e.target.select()}
              value={color.name}
              onChange={(e) => handleUpdate({ ...color, name: e.target.value })}
              className="focus:outline-none hover:bg-gray-100 w-full py-1"
            />
          </h2>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-1 text-gray-500 hover:text-red-400 text-3xl mb-2 hover:bg-red-100 focus:outline-none"
          >
            <FaTrashAlt />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex">
            <h3 className={styles.controlHeader}>Hue</h3>
            <div className={styles.control}>
              <label>
                <div className="">Start</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.hue.min}
                  max={config.hue.max}
                  step={config.hue.step}
                  value={color.hue.start}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      hue: {
                        ...color.hue,
                        start: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
              <label>
                <div>Range</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.hue.min}
                  max={config.hue.range}
                  step={config.hue.step}
                  value={color.hue.range}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      hue: {
                        ...color.hue,
                        range: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div className="flex w-full text-gray-800">
            <h3 className={styles.controlHeader}>Saturation</h3>
            <div className={styles.control}>
              <label>
                <div>Intensity</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.saturation.a.min}
                  max={config.saturation.a.max}
                  step={config.saturation.a.step}
                  value={color.saturation.a}
                  onChange={(e) => {
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        a: Number(e.target.value),
                      },
                    });
                  }}
                />
              </label>
              <label>
                <div>Offset</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.saturation.b.min}
                  max={config.saturation.b.max}
                  step={config.saturation.b.step}
                  value={color.saturation.b}
                  onChange={(e) => {
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        b: Number(e.target.value),
                      },
                    });
                  }}
                />
              </label>
              <label>
                <div>Boost</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.saturation.c.min}
                  max={config.saturation.c.max}
                  step={config.saturation.c.step}
                  value={color.saturation.c}
                  onChange={(e) => {
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        c: Number(e.target.value),
                      },
                    });
                  }}
                />
              </label>
            </div>
          </div>
          <div className="flex">
            <h3 className={styles.controlHeader}>Lightness</h3>
            <div className={styles.control}>
              <label>
                <div>Start</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.lightness.min}
                  max={config.lightness.max}
                  step={config.lightness.step}
                  value={color.lightness.start}
                  onChange={(e) => {
                    const newStart = Number(e.target.value);
                    handleUpdate({
                      ...color,
                      lightness: {
                        ...color.lightness,
                        start: newStart,
                      },
                    });
                  }}
                />
              </label>
              <label>
                <div>Range</div>
                <input
                  className={styles.input}
                  type="range"
                  min={config.lightness.min}
                  max={config.lightness.max}
                  step={config.lightness.step}
                  value={color.lightness.range}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      lightness: {
                        ...color.lightness,
                        range: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
            </div>
          </div>
        </div>

        <ul className="flex mt-1 mb-8 justify-between items-center space-x-4">
          {shades.map(({ hue, lightness, saturation }, shadeIdx) => {
            const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            const copyText = `hsl-${hue}-${saturation}-${lightness}`;

            return (
              <li
                key={`color-${idx}-shade-${shadeIdx}`}
                style={{ backgroundColor: bgColor }}
              >
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(bgColor);
                  }}
                  className="rounded p-6 focus:outline-none opacity-0 hover:opacity-100 transition duration-75"
                >
                  <FaCopy
                    style={{
                      color: `hsl(${hue}, ${saturation}%, ${Math.min(
                        lightness + 20,
                        100
                      )}%)`,
                    }}
                    className="w-5 h-auto text-xl"
                  />
                  <span id={copyText} className="hidden ">
                    {bgColor}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </li>
    );
  });

  return (
    <div className="max-w-3xl mx-auto relative font-mono">
      <h1 className="text-6xl mt-16 block">Color Generator</h1>
      <ul className="mt-16 flex flex-col space-y-12">{palette}</ul>
      <button
        type="button"
        onClick={handleCreate}
        className="bg-green-500 text-xl mt-12 mb-12 hover:bg-green-600 text-green-100 px-5 pt-3 pb-2 focus:outline-none"
      >
        Add Color
      </button>
    </div>
  );
}

export default App;
