import React, { useState } from 'react';

const FileManagement = ({ onCreateFile, onDeleteFile, mode }) => {
  const [newFileName, setNewFileName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      // Ensure file has proper extension
      let fileName = newFileName;
      if (!fileName.includes('.')) {
        fileName = `${fileName}.js`;
      }
      
      // Prepend / if needed
      if (!fileName.startsWith('/')) {
        fileName = `/${fileName}`;
      }
      
      onCreateFile(fileName);
      setNewFileName('');
      setShowInput(false);
    }
  };
  
  return (
    <div className={`flex flex-wrap items-center p-3 mb-5 border-b rounded-lg ${mode === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
      <button 
        onClick={() => setShowInput(true)}
        className="mr-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-sm"
      >
        New File
      </button>
      
      <button 
        onClick={onDeleteFile}
        className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium text-sm"
      >
        Delete Current File
      </button>
      
      {showInput && (
        <div className="mt-2 md:mt-0 ml-0 md:ml-3 flex w-full md:w-auto">
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            placeholder="filename.js"
            className={`px-3 py-1.5 rounded-l-lg border focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              mode === 'dark' 
                ? 'bg-gray-800 border-gray-700 text-white' 
                : 'bg-white border-gray-300'
            }`}
            autoFocus
          />
          <button 
            onClick={handleCreateFile}
            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-r-lg shadow-md font-medium transition-all text-sm"
          >
            Create
          </button>
          <button 
            onClick={() => {setShowInput(false); setNewFileName('');}}
            className="px-3 py-1.5 ml-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-lg shadow-md font-medium transition-all text-sm"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default FileManagement;