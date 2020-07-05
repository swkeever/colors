import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { AppContext } from '../App';

export default function DeleteButton({ color }) {
  const { handleDelete } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={() => handleDelete(color.index)}
      className="px-4 py-1 text-gray-500 hover:text-red-400 text-3xl mb-2 hover:bg-red-100 focus:outline-none"
    >
      <FaTrashAlt />
    </button>
  );
}
