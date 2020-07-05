import React from 'react';
import ColorName from './ColorName';
import DeleteButton from './DeleteButton';
import ColorShades from './ColorShades';
import ControlPanel from './ControlPanel';

export default function ColorPaletteItem({ color }) {
  return (
    <li key={`color-${color.index}`}>
      <div className="flex justify-between mb-2">
        <ColorName color={color} />
        <DeleteButton color={color} />
      </div>
      <div className="mb-4">
        <ControlPanel color={color} />
      </div>
      <div className="mb-8">
        <ColorShades color={color} />
      </div>
    </li>
  );
}
