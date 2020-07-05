import React, { useContext } from 'react';
import { AppContext } from '../App';
import generateShades from '../shades';
import ColorPaletteItem from './ColorPaletteItem';

export default function ColorPalette() {
  const { colors } = useContext(AppContext);

  return (
    <ul className="mt-16 flex flex-col space-y-12">
      {colors.map((color, index) => (
        <ColorPaletteItem
          color={{
            ...color,
            index,
            shades: generateShades(color),
          }}
        />
      ))}
    </ul>
  );
}
