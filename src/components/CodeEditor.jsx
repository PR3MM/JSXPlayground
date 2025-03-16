import React from 'react';
import { 
  SandpackProvider,
  SandpackLayout, 
  SandpackFileExplorer, 
  SandpackCodeEditor, 
  SandpackPreview
} from "@codesandbox/sandpack-react";
import { amethyst } from "@codesandbox/sandpack-themes";

const CodeEditor = ({ files, mode, activeFile, setActiveFile }) => {
  return (
    <SandpackProvider
      files={files}
      theme={mode === 'light' ? "light" : amethyst}
      template="react"
      options={{
        activeFile: activeFile,
        visibleFiles: Object.keys(files).filter(file => !files[file].hidden),
        recompileMode: "delayed",
        recompileDelay: 500,
        editorHeight: 500,
        autorun: true,
        // autoReload: true,
        externalResources: [
          "https://cdn.jsdelivr.net/npm/eslint@8.38.0/lib/api.js",
        ]
        
      }}
      customSetup={{
        dependencies: {
          "@codemirror/autocomplete": "6.4.2",
          "@codemirror/lint": "6.2.1",
          "@codemirror/state": "6.2.1",
          "@codemirror/language": "6.6.0"
        }
      }}
    >
      <SandpackLayout>
        <SandpackFileExplorer />
        <div className="editor-container flex flex-col flex-1">
          <SandpackCodeEditor 
            showLineNumbers={true}
            showInlineErrors={true}
            wrapContent={true}
            closableTabs
            className="flex-1"
            options={{
              autoIndent: true,
              lint: true,
              autoCloseBrackets: true,
              autoCloseTags: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              matchBrackets: true,
              smartIndent: true,
              tabSize: 2,
              lineWrapping: true,
            }}
          />
        </div>
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CodeEditor;