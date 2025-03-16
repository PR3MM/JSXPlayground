# JSXPlayground


## 📋 Overview

JSXPlayground is a comprehensive web-based React development environment that allows developers to write, preview, and experiment with React code in real-time, all within the browser. No setup required!

## ✨ Features

### 🖥️ Interactive Code Editor
- Built around CodeSandbox's Sandpack for real-time code editing and previewing
- Syntax highlighting, auto-completion, and error detection
- File explorer for easy navigation between files
- Real-time preview of rendered components

### 📁 File Management System
- Create new files with appropriate templates based on file type
- Delete files when no longer needed
- File system simulation with project structure

### 🤖 AI-Powered Code Generation
- Integration with Google's Gemini 1.5 Pro API
- Generate complete React components from text descriptions
- Apply AI suggestions directly into the editor

### 📦 Package Management
- Simulated terminal interface for npm commands
- Install npm packages directly from the terminal
- Automatically updates package.json with new dependencies

### 🎨 Theme Customization
- Toggle between light and dark themes
- Tailwind CSS styling for consistent UI

## 🛠️ Technical Architecture

- **Frontend Framework**: React 19 with modern Hooks
- **Build System**: Vite 6 for fast development and optimized production builds
- **Styling**: Tailwind CSS for responsive design
- **Code Editor**: @codesandbox/sandpack-react for in-browser code execution
- **AI Integration**: @google/generative-ai SDK
- **Terminal Emulation**: Custom implementation with npm command support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/jsx-playground.git

# Navigate to project directory
cd jsx-playground

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/01450b23-67a9-452a-a81f-ab5487fa6ed9)


## 📖 Usage Guide

### Creating a New File
1. Click the "New" button in the file explorer
2. Enter a filename with appropriate extension
3. Select the file type template
4. Begin editing your new file

### Adding npm Packages
1. Click on the terminal tab
2. Use the command: `npm install package-name`
3. The package will be automatically added to your dependencies

### Using AI Code Generation
1. Click the "AI" button in the editor
2. Enter a description of the component you want to create
3. Review the generated code and apply it to your project

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


