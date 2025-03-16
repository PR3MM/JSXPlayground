import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackCodeEditor 
} from "@codesandbox/sandpack-react";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <SandpackProvider>
      <SandpackLayout
        codePanel={<SandpackCodeEditor />}
        previewPanel={<SandpackPreview />}
      />
    <App />
    </SandpackProvider>


  </StrictMode>,
)
