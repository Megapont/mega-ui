import React, { useEffect } from 'react';
import { Editor, loader, type Monaco } from '@monaco-editor/react';
import { useStore } from '@lib/store/CodeStore';

// Function to define Clarity language
const defineClarityLanguage = (monaco: Monaco) => {
  monaco.languages.register({ id: 'clarity' });

  monaco.languages.setMonarchTokensProvider('clarity', {
    tokenizer: {
      root: [
        // Comments
        [/(;;.*$)/, 'comment'],

        // Strings
        [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

        // Keywords
        [
          /\b(contract-call?|impl-trait|define-data-var|define-public|define-private|define-read-only|define-constant|begin|let|if|map-set|map-get\?|and|or|not|is-eq|unwrap-panic|unwrap-err-panic|unwrap-err!|unwrap!|asserts!|try!|ok|err)\b/,
          'keyword',
        ],

        // Numbers - Clarity supports both signed and unsigned integers
        [/\bu?[0-9]+/, 'number'],

        // Brackets and Parentheses
        [/[{}()[\]]/, '@brackets'],

        // Operators
        [/[=<>!+\-*/%]/, 'operator'],
      ],

      string: [
        [/[^"]+/, 'string'],
        [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }],
      ],
    },
  });
};

const CodeEditor = () => {
  const { code, setCode } = useStore();
  function handleEditorChange(value: string | undefined) {
    console.log('here is the current model value:', value);
    setCode(value!);
  }

  useEffect(() => {
    loader.init().then((monaco) => {
      defineClarityLanguage(monaco);
    });
  }, []);

  return (
    <Editor
      height="50vh"
      theme="vs-dark"
      defaultLanguage="clarity" // Set to use the custom Clarity language
      value={code}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
