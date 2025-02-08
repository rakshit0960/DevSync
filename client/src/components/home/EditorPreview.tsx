"use client";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import { useState } from "react";

const INITIAL_CODE = `const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`;

export default function EditorPreview() {
  const [code, setCode] = useState(INITIAL_CODE);

  return (
    <div className="relative">
      {/* Code Editor */}
      <div className="rounded-lg bg-gray-900/95 p-4 font-mono text-sm text-gray-300 shadow-xl ring-1 ring-white/10">
        <div className="flex items-center justify-between border-b border-gray-700/80 pb-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-500 transition-colors" />
            </div>
            <div className="text-xs text-gray-400 font-medium">server.js</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Editor
            className="z-10"
            height="550px"
            defaultLanguage="javascript"
            value={code}
            theme="vs-dark"
            onChange={(value) => setCode(value || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              lineHeight: 1.6,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              readOnly: false,
              fontFamily: "'Fira Code', monospace",
              lineNumbers: "off",
              lineNumbersMinChars: 3,
              formatOnPaste: true,
              tabSize: 4,
            }}
          />
        </motion.div>
      </div>

      {/* Active Collaborators */}
      <div className="absolute z-20 top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-3 bg-black/70 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md ring-1 ring-white/20 shadow-lg hover:ring-white/40 hover:bg-black/80 transition-all">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.2 }}
              className="relative h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 ring-2 ring-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              <span className="text-xs font-medium text-white">U{i}</span>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-sm font-medium text-white/90 hover:text-white transition-colors"
        >
          +2 active
        </motion.div>
      </div>
    </div>
  );
}
