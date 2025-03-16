// App.js
import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview
} from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";
import Navbar from "./components/Navbar";
import TerminalComponent from './components/TerminalComponent';
import CodeSuggestionComponent from './components/CodeSuggestionComponent';
import FileManagement from './components/FileManagement';

const App = () => {
  const initialFiles = {
    '/App.js': {
      code: `import React from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h1>Hello Developer..!!</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}`,
      active: true
    },
    '/styles.css': {
      code: `
.App {
  font-family: sans-serif;
  text-align: center;
}
    `,
    },
    '/index.js': {
      code: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      hidden: true
    },
    '/package.json': {
      code: JSON.stringify({
        name: "react-sandbox",
        version: "1.0.0",
        description: "React sandbox",
        main: "/index.js",
        dependencies: {
          "react": "18.2.0",
          "react-dom": "18.2.0",
          "react-scripts": "5.0.1",
        }
      }, null, 2),
      hidden: true
    }
  }
  const [mode, setMode] = useState('dark');
  const [btnText, setBtnText] = useState('Enable Dark Mode');
  const [installedPackages, setInstalledPackages] = useState([]);
  const [activeFile, setActiveFile] = useState('/App.js');
  const [files, setFiles] = useState(initialFiles);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      setBtnText('Enable Light Mode');
    } else {
      setMode('light');
      setBtnText('Enable Dark Mode');
    }
  };

  const handlePackageInstall = (packageName) => {
    if (packageName && !installedPackages.includes(packageName)) {
      setInstalledPackages(prev => [...prev, packageName]);

      setFiles(prevFiles => {
        const packageJson = JSON.parse(prevFiles['/package.json'].code);
        packageJson.dependencies[packageName] = "latest";

        return {
          ...prevFiles,
          '/package.json': {
            ...prevFiles['/package.json'],
            code: JSON.stringify(packageJson, null, 2)
          }
        };
      });
    }
  };

  const handleApplySuggestion = (suggestion) => {
    let componentCode = suggestion;

    const codeBlockRegex = /```(?:jsx|js|javascript)?\s*([\s\S]*?)```/;
    const match = suggestion.match(codeBlockRegex);
    if (match && match[1]) {
      componentCode = match[1];
    }

    const fileName = `/AIComponent${Math.floor(Math.random() * 1000)}.js`;

    setFiles(prevFiles => ({
      ...prevFiles,
      [fileName]: {
        code: componentCode,
        active: true
      }
    }));

    setActiveFile(fileName);
  };

  const handleCreateFile = (fileName) => {
    let defaultContent = '';
    if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
      defaultContent = `import React from "react";\n\nexport default function ${fileName.split('/').pop().split('.')[0]}() {\n  return (\n    <div>\n      \n    </div>\n  );\n}`;
    } else if (fileName.endsWith('.css')) {
      defaultContent = `/* Styles for ${fileName} */\n\n`;
    }

    setFiles(prevFiles => ({
      ...prevFiles,
      [fileName]: {
        code: defaultContent,
        active: true
      }
    }));

    setActiveFile(fileName);
  };

  const handleDeleteFile = () => {
    if (['/index.js', '/App.js', '/package.json'].includes(activeFile)) {
      alert('Cannot delete essential project files');
      return;
    }

    setFiles(prevFiles => {
      const newFiles = { ...prevFiles };
      delete newFiles[activeFile];
      return newFiles;
    });

    setActiveFile('/App.js');
  };

  return (
    <div className={`flex flex-col h-screen ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <Navbar mode={mode} toggleMode={toggleMode} btnText={btnText} />

      <CodeSuggestionComponent onApplySuggestion={handleApplySuggestion} mode={mode} />

      <FileManagement
        onCreateFile={handleCreateFile}
        onDeleteFile={handleDeleteFile}
        mode={mode}
      />

      <CodeEditor
        files={files}
        mode={mode}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
      />

      <div className="terminal-container" >
        <TerminalComponent onPackageInstall={handlePackageInstall} mode={mode} />
      </div>
    </div>
  );
}

export default App;