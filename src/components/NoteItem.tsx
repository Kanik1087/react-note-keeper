import React from 'react';
import { Note } from '../types';
import { Pencil, Trash2 } from 'lucide-react';

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  const createdDate = new Date(note.createdAt).toLocaleDateString();
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{note.title}</h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(note)}
            className="text-blue-500 hover:text-blue-700 transition-colors"
            aria-label="Edit note"
          >
            <Pencil size={18} />
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
            aria-label="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-gray-600 line-clamp-3 min-h-[4.5rem]">{note.content}</p>
      </div>
      <div className="text-xs text-gray-400">{createdDate}</div>
    </div>
  );
};

export default NoteItem;