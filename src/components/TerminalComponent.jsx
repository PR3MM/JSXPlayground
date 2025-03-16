// components/TerminalComponent.js
import React, { useState } from 'react';

const TerminalComponent = ({ onPackageInstall, mode }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    'Welcome to the terminal!',
    'Type "npm install <package-name>" to install packages.'
  ]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    
    const npmInstallRegex = /npm\s+install\s+(@?[a-zA-Z0-9-_]+\/)?[a-zA-Z0-9-_]+/;
    
    setOutput(prev => [...prev, `$ ${command}`]);
    
    if (npmInstallRegex.test(command)) {
      const packageName = command.split(' ')[2];
      
      setOutput(prev => [
        ...prev,
        `Installing ${packageName}...`,
        `+ ${packageName}@latest`,
        `added 1 package in 2s`
      ]);
      
      onPackageInstall(packageName);
    } else if (command.trim() !== '') {
      setOutput(prev => [...prev, 'Command not recognized. Try "npm install <package-name>"']);
    }
    
    setCommand('');
  };

  return (
    <div className={` shadow-md overflow-hidden ${mode === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`p-2 text-sm font-semibold border-b ${mode === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-gray-200 border-gray-300 text-gray-800'}`}>
        Terminal
      </div>
      <div className={`p-3 font-mono text-sm h-60 overflow-auto ${mode === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-black text-green-400'}`}>
        {output.map((line, index) => (
          <div key={index} className="my-1">{line}</div>
        ))}
        <form onSubmit={handleCommandSubmit} className="flex mt-2">
          <span className={`mr-2 ${mode === 'dark' ? 'text-blue-400' : 'text-green-500'}`}>$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className={`flex-1 bg-transparent focus:outline-none ${mode === 'dark' ? 'text-gray-300' : 'text-green-400'}`}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default TerminalComponent;