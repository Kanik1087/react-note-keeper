import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import { generateId } from '../utils/noteStorage';
import { Save, X, Plus } from 'lucide-react';

interface NoteFormProps {
  editingNote: Note | null;
  onSubmit: (note: Note) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ editingNote, onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [charCount, setCharCount] = useState(0);
  
  const MAX_CHARS = 500;
  
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setCharCount(editingNote.content.length);
    } else {
      setTitle('');
      setContent('');
      setCharCount(0);
    }
  }, [editingNote]);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setCharCount(newContent.length);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) return;
    
    const newNote: Note = {
      id: editingNote ? editingNote.id : generateId(),
      title: title.trim(),
      content: content.trim(),
      createdAt: editingNote ? editingNote.createdAt : new Date().toISOString(),
    };
    
    onSubmit(newNote);
    
    if (!editingNote) {
      setTitle('');
      setContent('');
      setCharCount(0);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {editingNote ? 'Edit Note' : 'Add New Note'}
        </h2>
        {editingNote && (
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Cancel editing"
          >
            <X size={20} />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Enter note title"
            required
          />
        </div>
        
        <div className="mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[120px]"
            placeholder="Enter note content"
            maxLength={MAX_CHARS}
            required
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <span>Characters: {charCount}/{MAX_CHARS}</span>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            {editingNote ? (
              <>
                <Save size={16} className="mr-2" />
                Update Note
              </>
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Add Note
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;