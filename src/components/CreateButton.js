import React, { useContext } from 'react';
import { AppContext } from '../App';

export default function CreateButton() {
  const { handleCreate } = useContext(AppContext);

  return (
    <button
      type="button"
      onClick={handleCreate}
      className="bg-green-500 text-xl mt-12 mb-12 hover:bg-green-600 text-green-100 px-5 pt-3 pb-2 focus:outline-none"
    >
      Add Color
    </button>
  );
}
