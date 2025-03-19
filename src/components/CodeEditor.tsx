
import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onChange?: (code: string) => void;
  readonly?: boolean;
  height?: string;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultValue = '',
  language = 'python',
  onChange,
  readonly = false,
  height = '400px',
  className,
}) => {
  const [code, setCode] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (defaultValue !== code) {
      setCode(defaultValue);
    }
  }, [defaultValue]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-lg overflow-hidden border",
        isFocused ? "border-primary/50 ring-2 ring-primary/20" : "border-border",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ height }}
    >
      <div className="absolute top-0 left-0 right-0 h-9 bg-muted/50 border-b border-border flex items-center px-4">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="ml-4 text-xs font-medium text-muted-foreground">
          {language.toUpperCase()}
        </div>
      </div>
      
      <div className="relative mt-9 h-[calc(100%-2.25rem)] overflow-auto">
        <textarea
          value={code}
          onChange={handleCodeChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          readOnly={readonly}
          className={cn(
            "absolute top-0 left-0 w-full h-full text-transparent bg-transparent caret-primary z-10 font-mono leading-normal resize-none p-4 overflow-auto",
            readonly ? "cursor-default" : "cursor-text"
          )}
          spellCheck="false"
          style={{ caretShape: 'bar' }}
        />
        
        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{ margin: 0, height: '100%', background: 'transparent' }}
          codeTagProps={{ style: { fontFamily: 'inherit' } }}
          className="!bg-transparent"
        >
          {code || ' '}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
};

export default CodeEditor;
