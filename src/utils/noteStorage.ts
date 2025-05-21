import { Note } from '../types';

// Initial data
const initialNotes: Note[] = [];

// Load notes from localStorage
export const loadNotes = (): Note[] => {
  try {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : initialNotes;
  } catch (error) {
    console.error('Error loading notes:', error);
    return initialNotes;
  }
};

// Save notes to localStorage
export const saveNotes = (notes: Note[]): void => {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
  }
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};