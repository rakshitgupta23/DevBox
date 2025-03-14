import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
const CodeEditor = ({ onChange, language, code, theme,action }) => {
  const [value, setValue] = useState(code || "");
  useEffect(() => {
    setValue(code || "");
  }, [code]);

  const handleEditorChange = (value: typeof code) => {
    setValue(value);
    onChange(action, value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="//write your code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;
