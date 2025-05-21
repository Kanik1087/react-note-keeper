import React from 'react';
import { Note } from '../types';
import NoteItem from './NoteItem';

interface NoteListProps {
  notes: Note[];
  searchTerm: string;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, searchTerm, onEdit, onDelete }) => {
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-500">
        {searchTerm ? (
          <>
            <p className="text-lg mb-2">No notes match your search</p>
            <p className="text-sm">Try different keywords</p>
          </>
        ) : (
          <>
            <p className="text-lg mb-2">No notes yet</p>
            <p className="text-sm">Add your first note using the form above</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes.map(note => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default NoteList;