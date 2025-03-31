import React, { useState } from 'react';
import EditorComponent from './EditorComponent';
import { OutputData } from '@editorjs/editorjs';
import './App.css';

function App() {
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [showData, setShowData] = useState(false);

  const handleSave = () => {
    setShowData(true);
  };

  const handleChange = (data: OutputData) => {
    setEditorData(data);
  };

  return (
    <div className="app">
      <h1>Editor.js Demo</h1>
      <div className="editor-container">
        <EditorComponent 
          onChange={handleChange}
          holder="editorjs-container"
        />
      </div>
      <button onClick={handleSave} className="save-button">
        Сохранить
      </button>
      {showData && editorData && (
        <div className="output">
          <h3>Данные редактора (JSON):</h3>
          <pre>{JSON.stringify(editorData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
