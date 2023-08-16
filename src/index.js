import React from "react";
import ReactDOM from "react-dom";
import { marked } from "marked";
import Prism from "prismjs";
import "./style.scss";

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  },
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href=${href}>${text}</a>`;
};

const Editor = ({ content, handleTextareaInput }) => (
  <div className="editor-container">
    <h1>Editor</h1>
    <textarea id="editor" value={content} onChange={handleTextareaInput} />
  </div>
);

const Previewer = ({ content }) => (
  <div className="previewer-container">
    <h1>Preview</h1>
    <div
      id="preview"
      dangerouslySetInnerHTML={{
        __html: marked(content, { renderer: renderer }),
      }}
    />
  </div>
);

const App = () => {
  const initialState = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
  `;
  const [content, setContent] = React.useState(initialState);

  const handleTextareaInput = (event) => {
    setContent(event.target.value);
  };
  return (
    <div className="App">
      <Editor content={content} handleTextareaInput={handleTextareaInput} />
      <Previewer content={content} />
    </div>
  );
};

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
