import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Table from '@editorjs/table';
import Code from '@editorjs/code';
import Link from '@editorjs/link';
import Image from '@editorjs/image';
import Checklist from '@editorjs/checklist';

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

const EditorComponent: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          quote: Quote,
          marker: Marker,
          table: Table,
          code: Code,
          link: Link,
          image: Image,
          checklist: Checklist,
        },
        data: data || {
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'Начните писать здесь...'
              }
            }
          ]
        },
        async onChange(api) {
          const savedData = await api.saver.save();
          onChange(savedData);
        }
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return <div id={holder} />;
};

export default EditorComponent;