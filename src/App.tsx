import React, { useState, useRef } from 'react';
import EditorComponent, { EditorInstance } from './EditorComponent';
import { OutputData } from '@editorjs/editorjs';

import './App.css';

const exampleHtml = `
<h1>Пример заголовка</h1>
<p>Это пример абзаца с <strong>жирным</strong> и <em>курсивным</em> текстом.</p>
<ul>
  <li>Пункт списка 1</li>
  <li>Пункт списка 2</li>
</ul>
<blockquote>Цитата</blockquote>
`;

function App() {
  const [editorData, setEditorData] = useState<OutputData | null>(null);
  const [showData, setShowData] = useState(false);
  const [htmlInput, setHtmlInput] = useState(exampleHtml);
  const [importStatus, setImportStatus] = useState('');
  const editorRef = useRef<EditorInstance>(null);

  const handleSave = () => {
    setShowData(true);
  };

  const handleChange = (data: OutputData) => {
    setEditorData(data);
  };

  const handleImport = async () => {

  };

  return (
    <div className="app">
      <h1>Editor.js Demo</h1>
      
      <div className="import-section">
        <h3>Импорт HTML:</h3>
        <textarea
          value={htmlInput}
          onChange={(e) => setHtmlInput(e.target.value)}
          placeholder="Вставьте HTML код здесь..."
          rows={10}
        />
        <div className="import-controls">
          <button onClick={handleImport} className="import-button">
            Импортировать HTML
          </button>
          {importStatus && <span className="import-status">{importStatus}</span>}
        </div>
      </div>

      <div className="editor-container">
        <EditorComponent 
          ref={editorRef}
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
