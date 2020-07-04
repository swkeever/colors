import React, { useState } from 'react';
import { FaCopy, FaTrashAlt } from 'react-icons/fa';
import generateShades from './shades';
import config from './config';

const APP_DATA_KEY = 'appData';

function random(max) {
  return 
}

const getRandomColor = () => ({
  name: 'gray',
  hue: {
    start: Math.floor(Math.random() * config.hue.max),
    range: 7,
  },
  saturation: 0.5,
  lightness: {
    start: config.lightness.min,
    range: 100,
  },
});

function getInitialColors() {
  const appData = localStorage.getItem(APP_DATA_KEY);
  if (false && appData) {
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

      `,

      control: `
      flex 
      space-x-4
      mb-2
      `,
    };

    return (
      <li>
        <div class="flex justify-between mb-2">
          <h2 class="text-2xl">
            <input
              value={color.name}
              onChange={(e) => handleUpdate({ ...color, name: e.target.value })}
              class="focus:outline-none hover:bg-gray-100 w-full py-1"
            />
          </h2>
          <button
            type="button"
            onClick={handleDelete}
            class="px-2 py-1 text-red-500 text-xl hover:bg-gray-100 focus:outline-none"
          >
            <FaTrashAlt />
          </button>
        </div>

        <div class="mb-4">
          <div class="flex">
            <div class={styles.control}>
              <label>
                Hue
                {config.hue.min}&deg;
                <input
                  class={styles.input}
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
                {config.hue.max}&deg;
              </label>
              <label>
                Range
                {config.hue.min}&deg;
                <input
                  class={styles.input}
                  type="range"
                  min={config.hue.min}
                  max={config.hue.max}
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
                {config.hue.max}&deg;
              </label>
            </div>
          </div>
          <div class="flex">
            <div class="w-3/12">Saturation</div>
            <div class={styles.control}>
              <label>
                Boost
                <input
                  class={styles.input}
                  type="range"
                  min={config.saturation.min}
                  max={config.saturation.max}
                  step={config.saturation.step}
                  value={color.saturation}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      saturation: Number(e.target.value),
                    })
                  }
                />
              </label>
            </div>
          </div>
          <div class="flex">
            <div class="w-3/12">Lightness</div>
            <div class="flex space-x-4">
              <label>
                Start 0%
                <input
                  class={styles.input}
                  type="range"
                  min={config.lightness.min}
                  max={config.lightness.max}
                  step={config.lightness.step}
                  value={color.lightness.start}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      lightness: {
                        ...color.lightness,
                        start: Number(e.target.value),
                      },
                    })
                  }
                />
                100%
              </label>
              <label>
                Range 0%
                <input
                  class={styles.input}
                  type="range"
                  min={color.lightness.min}
                  max={config.lightness.max - config.lightness.start}
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
                {config.lightness.max - color.lightness.start}%
              </label>
            </div>
          </div>
        </div>

        <ul class="flex mt-1 mb-8 justify-between items-center space-x-4">
          {shades.map(({ hue, lightness, saturation }) => {
            const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            const copyText = `hsl-${hue}-${saturation}-${lightness}`;

            return (
              <li style={{ backgroundColor: bgColor }}>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(bgColor);
                  }}
                  class="rounded p-6 focus:outline-none opacity-0 hover:opacity-100 transition duration-75"
                >
                  <FaCopy
                    style={{
                      color: `hsl(${hue}, ${saturation}%, ${Math.min(
                        lightness + 20,
                        100
                      )}%)`,
                    }}
                    class="w-5 h-auto text-xl"
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
    <div class="max-w-3xl mx-auto relative font-mono">
      <h1 class="text-4xl mt-16 block">Color Generator</h1>
      <ul class="mt-16">{palette}</ul>
      <button
        type="button"
        onClick={handleCreate}
        class="bg-green-500 hover:bg-green-600 text-green-100 px-3 pt-2 pb-1 focus:outline-none"
      >
        Add Color
      </button>
    </div>
  );
}

export default App;
