
import React, { useState } from 'react';
import { DreamEntry } from '../types';
import { BookOpen } from 'lucide-react';

interface DreamJournalProps {
  onAddEntry: (entry: DreamEntry) => void;
}

const DreamJournal: React.FC<DreamJournalProps> = ({ onAddEntry }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const newEntry: DreamEntry = {
        id: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
        text: text.trim(),
      };
      onAddEntry(newEntry);
      setText('');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
         <h1 className="text-4xl font-bold text-white">Dream Journal</h1>
         <p className="text-lavender-mist mt-2">A quiet space to remember your dreams.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What did you dream about...?"
          className="w-full h-64 p-4 bg-space-cadet/80 border border-celestial-blue/30 rounded-lg text-lavender-mist focus:ring-2 focus:ring-lunar-gold focus:outline-none transition-all"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-celestial-blue text-white font-bold rounded-full text-lg shadow-lg hover:bg-indigo-500 disabled:bg-celestial-blue/50 disabled:cursor-not-allowed transition-all"
        >
          <BookOpen className="mr-2" />
          Save Dream
        </button>
      </form>
    </div>
  );
};

export default DreamJournal;
