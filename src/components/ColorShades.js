import React from 'react';
import { FaCopy } from 'react-icons/fa';

export default function ColorShades({ color }) {
  return (
    <ul className="flex flex-col items-stretch md:flex-row justify-between md:items-center md:space-x-4">
      {color.shades.map(({ hue, lightness, saturation }, shadeIdx) => {
        const bgColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        const copyText = `hsl-${hue}-${saturation}-${lightness}`;

        return (
          <li
            key={`color-${color.index.toString()}-shade-${shadeIdx.toString()}`}
            style={{ backgroundColor: bgColor }}
          >
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(bgColor);
              }}
              className="p-6 md:rounded focus:outline-none opacity-0 hover:opacity-100 transition duration-75"
            >
              <FaCopy
                style={{
                  color: `hsl(${hue}, ${saturation}%, ${Math.min(
                    lightness + 30,
                    100,
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
  );
}
