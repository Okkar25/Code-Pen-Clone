import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  // const [html, setHtml] = useState("");
  // const [css, setCss] = useState("");
  // const [js, setJs] = useState("");

  // persistent data => replace useState with custom hook useLocalStorage
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    // effect body
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
         <body>${html}</body>
         <style>${css}</style>
         <script>${js}</script>
      </html>
    `);
    }, 250); // take effect after 250 milliseconds

    // clean up function
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts" // control the content inside the <iframe> as a layer of security
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
};

export default App;
