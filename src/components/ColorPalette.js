import React, { useContext } from 'react';
import { FaTrashAlt, FaEdit, FaCheck } from 'react-icons/fa';
import { AppContext } from '../App';
import ControlPanel from './ControlPanel';
import ColorShades from './ColorShades';
import generateShades from '../utils/shades';

export default function ColorPalette() {
  const { colors, handleUpdate, handleDelete } = useContext(AppContext);
  console.log(JSON.stringify(colors, null, 4));

  return (
    <ul className="mt-16 flex flex-col space-y-12">
      {colors.map((clr, index) => {
        const color = {
          ...clr,
          index,
          shades: generateShades(clr),
        };
        const styles = {
          icon: `
          px-4 
          py-2 
          text-gray-500 
          text-2xl
          md:text-3xl 
          focus:outline-none
          `,
        };

        return (
          <li key={`color-${color.index.toString()}`}>
            <div className="flex justify-between mb-2">
              <h2 className="text-2xl md:text-4xl text-gray-900">
                <input
                  onClick={(e) => e.target.select()}
                  value={color.name}
                  onChange={(e) => handleUpdate(color.index, { ...color, name: e.target.value })}
                  className="focus:outline-none rounded hover:bg-gray-100 w-full cursor-pointer py-1"
                />
              </h2>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleUpdate(color.index, {
                    ...color,
                    editing: !color.editing,
                  })}
                  className={`${styles.icon}
                  ${!color.editing
                    ? 'hover:text-yellow-500 hover:bg-yellow-100'
                    : 'hover:text-green-500 hover:bg-green-100'}
                  `}
                >
                  {color.editing ? <FaCheck /> : <FaEdit />}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(color.index)}
                  className={`${styles.icon} 
                hover:text-red-400
                hover:bg-red-100 
                `}
                >
                  <FaTrashAlt />
                </button>
              </div>

            </div>
            <div className="mb-4">
              {color.editing && <ControlPanel color={color} />}
            </div>
            <div className="mb-8">
              <ColorShades color={color} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
