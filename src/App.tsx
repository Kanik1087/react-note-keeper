import React, { useState, useEffect } from 'react';
import { Note } from './types';
import { loadNotes, saveNotes } from './utils/noteStorage';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    const loadedNotes = loadNotes();
    setNotes(loadedNotes);
  }, []);

  const handleSaveNote = (note: Note) => {
    let updatedNotes: Note[];
    
    if (editingNote) {
      // Update existing note
      updatedNotes = notes.map(n => n.id === note.id ? note : n);
    } else {
      // Add new note
      updatedNotes = [note, ...notes];
    }
    
    setNotes(updatedNotes);
    saveNotes(updatedNotes);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    // Scroll to form when editing
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteNote = (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      const updatedNotes = notes.filter(note => note.id !== id);
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      
      // If currently editing the note being deleted, clear the editing state
      if (editingNote && editingNote.id === id) {
        setEditingNote(null);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-5xl mx-auto p-6">
        <NoteForm 
          editingNote={editingNote}
          onSubmit={handleSaveNote}
          onCancel={handleCancelEdit}
        />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
            <span className="text-gray-500 text-sm">{notes.length} note{notes.length !== 1 ? 's' : ''}</span>
          </div>
          
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          
          <NoteList 
            notes={notes}
            searchTerm={searchTerm}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        </div>
      </main>
    </div>
  );
}

export default App;