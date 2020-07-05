import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function ColorName({ color }) {
  const { handleUpdate } = useContext(AppContext);

  return (
    <h2 className="text-4xl w-1/2 text-gray-900">
      <input
        onClick={(e) => e.target.select()}
        value={color.name}
        onChange={(e) => handleUpdate(color.index, { ...color, name: e.target.value })}
        className="focus:outline-none cursor-pointer hover:bg-blue-100 hover:text-blue-600 w-full py-1"
      />
    </h2>
  );
}
