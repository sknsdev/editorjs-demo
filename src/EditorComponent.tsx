import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
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

export interface EditorInstance {
  clear: () => Promise<void>;
  render: (data: OutputData) => Promise<void>;
}

const EditorComponent = forwardRef<EditorInstance, EditorProps>(
  ({ data, onChange, holder }, ref) => {
    const editorInstance = useRef<EditorJS | null>(null);

    useImperativeHandle(ref, () => ({
      clear: async () => {
        if (editorInstance.current) {
          await editorInstance.current.clear();
        }
      },
      render: async (data: OutputData) => {
        if (editorInstance.current) {
          await editorInstance.current.render(data);
        }
      }
    }));

    useEffect(() => {
      if (!editorInstance.current) {
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
        editorInstance.current = editor;
      }

      return () => {
        if (editorInstance.current && editorInstance.current.destroy) {
          editorInstance.current.destroy();
        }
      };
    }, []);

    return <div id={holder} />;
  }
);

export default EditorComponent;