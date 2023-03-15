import React, { useState } from "react";
import Delete from "./icons/Delete";
import Copy from "./icons/Copy";
import Loading from './Loading'
import Editor from "@monaco-editor/react";
import { CopyToClipboard } from "react-copy-to-clipboard";



const App = () => {
    const [value, setValue] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);

    const copyToClipBoard = () => alert(`已复制 ✅`);
    
    const handleSubmit = () => {
      // 👇🏻 打开 loading
      setLoading(true);
      fetch("http://localhost:4000/convert", {
          method: "POST",
          body: JSON.stringify({
              value,
          }),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              // 👇🏻 关闭 loading
              setLoading(false);
              setOutput(data.response.trim());
          })
          .catch((err) => console.error(err));
  };

    return (
        <main className='app'>
            <header className='header__container'>
                <div className='header'>
                    <h3>JSON</h3>
                    <div className='header__right'>
                        <button className='runBtn' onClick={handleSubmit}>
                          运行
                        </button>
                        <Delete setValue={ setValue } />
                    </div>
                </div>

                <div className='header'>
                    <h3>Typescript</h3>
                    <CopyToClipboard text={output} onCopy={copyToClipBoard}>
                        <span>
                            <Copy />
                        </span>
                    </CopyToClipboard>
                </div>
            </header>

            <div className='code__container'>
              <div className='code'>
                    <Editor
                        height='90vh'
                        className='editor'
                        defaultLanguage='json'
                        defaultValue='{ }'
                        value={value}
                        onChange={(value) => setValue(value)}
                    />
                </div>
                <div className='output'>
                  {loading ? (
                      <Loading />
                  ) : (
                      <Editor
                          height='90vh'
                          className='editor'
                          defaultLanguage='typescript'
                          options={{
                              domReadOnly: true,
                              readOnly: true,
                          }}
                          defaultValue=''
                          value={output}
                          onChange={(value) => setOutput(value)}
                      />
                  )}
                </div>
            </div>
        </main>
    );
};

export default App;