import React, { useContext } from 'react';
import { AppContext } from '../App';
import config from '../utils/config';

function ControlHeader({ children }) {
  return <h3 className="text-gray-700 text-2xl">{children}</h3>;
}

export default function ControlPanel({ color }) {
  const { handleUpdate } = useContext(AppContext);

  const styles = {
    input: `
      bg-gray-200
      md:ml-1
      px-1
      block
      mx-auto
      cursor-pointer
      bg-blue-500
      `,

    control: `
      flex
      flex-col
      md:flex-row
      md:space-x-8
      md:ml-auto
      text-gray-700
      `,

    controlRow: `
    flex
    flex-col
    md:flex-row
    text-gray-800
    `,
  };

  return (
    <>
      <div className={styles.controlRow}>
        <ControlHeader>Hue</ControlHeader>
        <div className={styles.control}>
          <label htmlFor="hue-start">
            <div>Start</div>
            <input
              name="hue-start"
              className={styles.input}
              type="range"
              min={config.hue.min}
              max={config.hue.max}
              step={config.hue.step}
              value={color.hue.start}
              onChange={(e) => handleUpdate(color.index, {
                ...color,
                hue: {
                  ...color.hue,
                  start: Number(e.target.value),
                },
              })}
            />
          </label>
          <label htmlFor="hue-range">
            <div>Range</div>
            <input
              name="hue-range"
              className={styles.input}
              type="range"
              min={config.hue.min}
              max={config.hue.range}
              step={config.hue.step}
              value={color.hue.range}
              onChange={(e) => handleUpdate(color.index, {
                ...color,
                hue: {
                  ...color.hue,
                  range: Number(e.target.value),
                },
              })}
            />
          </label>
        </div>
      </div>
      <div className={styles.controlRow}>
        <ControlHeader>Saturation</ControlHeader>
        <div className={styles.control}>
          <label htmlFor="saturation-intensity">
            <div>Intensity</div>
            <input
              name="saturation-intensity"
              className={styles.input}
              type="range"
              min={config.saturation.a.min}
              max={config.saturation.a.max}
              step={config.saturation.a.step}
              value={color.saturation.a}
              onChange={(e) => {
                handleUpdate(color.index, {
                  ...color,
                  saturation: {
                    ...color.saturation,
                    a: Number(e.target.value),
                  },
                });
              }}
            />
          </label>
          <label htmlFor="saturation-offset">
            <div>Offset</div>
            <input
              name="saturation-offset"
              className={styles.input}
              type="range"
              min={config.saturation.b.min}
              max={config.saturation.b.max}
              step={config.saturation.b.step}
              value={color.saturation.b}
              onChange={(e) => {
                handleUpdate(color.index, {
                  ...color,
                  saturation: {
                    ...color.saturation,
                    b: Number(e.target.value),
                  },
                });
              }}
            />
          </label>
          <label htmlFor="saturation-boost">
            <div>Boost</div>
            <input
              name="saturation-boost"
              className={styles.input}
              type="range"
              min={config.saturation.c.min}
              max={config.saturation.c.max}
              step={config.saturation.c.step}
              value={color.saturation.c}
              onChange={(e) => {
                handleUpdate(color.index, {
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
      <div className={styles.controlRow}>
        <ControlHeader>Lightness</ControlHeader>
        <div className={styles.control}>
          <label htmlFor="lightness-start">
            <div>Start</div>
            <input
              name="lightness-start"
              className={styles.input}
              type="range"
              min={config.lightness.min}
              max={config.lightness.max}
              step={config.lightness.step}
              value={color.lightness.start}
              onChange={(e) => {
                const newStart = Number(e.target.value);
                handleUpdate(color.index, {
                  ...color,
                  lightness: {
                    ...color.lightness,
                    start: newStart,
                  },
                });
              }}
            />
          </label>
          <label htmlFor="lightness-range">
            <div>Range</div>
            <input
              name="lightness-range"
              className={styles.input}
              type="range"
              min={config.lightness.min}
              max={config.lightness.max}
              step={config.lightness.step}
              value={color.lightness.range}
              onChange={(e) => handleUpdate(color.index, {
                ...color,
                lightness: {
                  ...color.lightness,
                  range: Number(e.target.value),
                },
              })}
            />
          </label>
        </div>
      </div>
    </>
  );
}
