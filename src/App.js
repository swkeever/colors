import React, { useState } from 'react';
import { FaCopy, FaTrashAlt } from 'react-icons/fa';

function generateShades({ hue, saturation, lightness }) {
  if (hue.start > hue.end) {
    throw Error('hue.start > hue.end')
  }

  if (lightness.start > lightness.end) {
    throw Error('lightness.start > lightness.end')
  }

  let hs = [];
  let dx = (hue.end - hue.start) / 9;
  for (let x = hue.start; x <= hue.end; x += dx) {
    hs.push(Math.round(x % 360));
  }

  let ls = [];
  dx = (lightness.end - lightness.start) / 9;
  for (let x = lightness.start; x <= lightness.end; x += dx) {
    ls.push(Math.round(x));
    
  }

  let ss = [];
  for (let x = 10; x < 100; x += 10) {
    const { a, b, c } = saturation;
    ss.push(Math.round(a * x ** 2 + b * x + c));
  }

  let props = [];
  for (let i = 0; i < 9; i++) {
    props.push({
      hue: hs[i],
      saturation: ss[i],
      lightness: ls[i],
    });
  }

  return props;
}

const config = {
  hue: {
    min: 0,
    max: 360,
    step: 1,
  },
  saturation: {
    a: {
      min: 0.02,
      max: 0.03,
      step: 0.001,
    },
    b: {
      min: -3.0,
      max: -2.0,
      step: 0.1
    },
    c: {
      min: 100,
      max: 115,
      step: 0.5,
    },
  },
  lightness: {
    min: 0,
    max: 100,
    step: 1,
  },
};

const initialColor = {
  name: 'gray',
  hue: {
    start: config.hue.min,
    end: config.hue.min + 1,
  },
  saturation: {
    a: config.saturation.a.min,
    b: config.saturation.b.min,
    c: config.saturation.c.min,
  },
  lightness: {
    start: config.lightness.min,
    end: config.lightness.max,
  },
};

function App() {
  const [colors, setColors] = useState([initialColor]);

  const palette = colors.map((color, idx) => {
    const shades = generateShades(color);

    function handleUpdate(newColor) {
      const newColors = Array.from(colors);
      newColors[idx] = newColor;
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
            onClick={() =>
              setColors([...colors.slice(0, idx), ...colors.slice(idx + 1)])
            }
            class="px-2 py-1 text-red-500 text-xl hover:bg-gray-100 focus:outline-none"
          >
            <FaTrashAlt />
          </button>
        </div>

        <div class="mb-4">
          <div class="flex">
            <div class="w-3/12">
              Hue {color.hue.start}&deg; - {color.hue.end}&deg;
            </div>
            <div class={styles.control}>
              <label>
                0&deg;
                <input
                  class={styles.input}
                  type="range"
                  min={config.hue.min}
                  max={color.hue.end - 1}
                  step={config.hue.step}
                  value={color.hue.start}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      hue: {
                        start: Number(e.target.value),
                        end: color.hue.end,
                      },
                    })
                  }
                />
                {color.hue.end - 1}&deg;
              </label>
              <label>
                {color.hue.start + 1}&deg;
                <input
                  class={styles.input}
                  type="range"
                  min={color.hue.start + 1}
                  max={config.hue.max}
                  step={config.hue.step}
                  value={color.hue.end}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      hue: {
                        start: color.hue.start,
                        end: Number(e.target.value),
                      },
                    })
                  }
                />
                360&deg;
              </label>
            </div>
          </div>
          <div class="flex">
            <div class="w-3/12">Saturation</div>
            <div class={styles.control}>
              <label>
                a
                <input
                  class={styles.input}
                  type="range"
                  min={config.saturation.a.min}
                  max={config.saturation.a.max}
                  step={config.saturation.a.step}
                  value={color.saturation.a}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        a: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
              <label>
                b
                <input
                  class={styles.input}
                  type="range"
                  min={config.saturation.b.min}
                  max={config.saturation.b.max}
                  step={config.saturation.b.step}
                  value={color.saturation.b}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        b: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
              <label>
                c
                <input
                  class={styles.input}
                  type="range"
                  min={config.saturation.c.min}
                  max={config.saturation.c.max}
                  step={config.saturation.c.step}
                  value={color.saturation.c}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      saturation: {
                        ...color.saturation,
                        c: Number(e.target.value),
                      },
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
                Start
                <input
                  class={styles.input}
                  type="range"
                  min={config.lightness.min}
                  max={color.lightness.end - 1}
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
              </label>
              <label>
                End
                <input
                  class={styles.input}
                  type="range"
                  min={color.lightness.start + 1}
                  max={config.lightness.max}
                  value={color.lightness.end}
                  onChange={(e) =>
                    handleUpdate({
                      ...color,
                      lightness: {
                        ...color.lightness,
                        end: Number(e.target.value),
                      },
                    })
                  }
                />
              </label>
            </div>
          </div>
        </div>

        <ul class="flex mt-1 mb-8 justify-between items-center space-x-4">
          {shades.map(({ hue, lightness, saturation }) => {
            if (saturation < 0) {
              saturation = 0;
            }

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
        onClick={() => setColors(colors.concat(initialColor))}
        class="bg-green-500 hover:bg-green-600 text-green-100 px-3 pt-2 pb-1 focus:outline-none"
      >
        Add Color
      </button>
    </div>
  );
}

export default App;
