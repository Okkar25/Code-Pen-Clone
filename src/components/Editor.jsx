import {
  faCompressAlt,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/theme/material.css";
import React, { useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

const Editor = (props) => {
  const { displayName, language, value, onChange } = props;

  const [open, setOpen] = useState(true);

  const handleChange = (editor, data, value) => {
    onChange(value);
  };

  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}

        <button
          type="button"
          className="expand-collapse-btn"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExchangeAlt} />
        </button>
      </div>

      <ControlledEditor
        value={value}
        onBeforeChange={handleChange}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "material",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
