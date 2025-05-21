import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-md">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-3">
          <BookOpen size={28} className="text-amber-300" />
          <h1 className="text-2xl font-bold">NoteKeeper</h1>
        </div>
        <p className="mt-2 text-blue-100 text-sm">
          Capture your thoughts, ideas, and reminders in one place
        </p>
      </div>
    </header>
  );
};

export default Header;