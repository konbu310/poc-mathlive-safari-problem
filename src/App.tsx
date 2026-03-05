import { convertLatexToMarkup, MathfieldElement } from "mathlive";
import { FC, InputEvent, useRef, useState } from "react";
import { MathField } from "./MathField";

export const App: FC = () => {
  const mfRef = useRef<MathfieldElement>(null);
  const [latex, setLatex] = useState("\\frac{x^2 + y^2}{2}");
  const [draftLatex, setDraftLatex] = useState(latex);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const openEditor = () => {
    setIsEditorOpen(true);
    setDraftLatex(latex);
  };
  const closeEditor = () => {
    setIsEditorOpen(false);
  };
  const applyChanges = () => {
    setLatex(draftLatex);
    closeEditor();
  };
  const handleInput = (ev: InputEvent<MathfieldElement>) => {
    const value = ev.currentTarget.value;
    setDraftLatex(value);
  };

  return (
    <div className="page">
      <div role="button" onClick={openEditor} className="preview-card">
        <span
          className="preview-content"
          dangerouslySetInnerHTML={{
            __html: convertLatexToMarkup(latex),
          }}
        />
      </div>

      {isEditorOpen && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeEditor();
          }}
        >
          <div className="dialog" onMouseDown={(e) => e.stopPropagation()}>
            <MathField
              value={draftLatex}
              onInput={handleInput}
              nodeRef={mfRef}
              className="editor-field"
            />

            <div className="actions">
              <button type="button" onClick={closeEditor} className="button">
                Cancel
              </button>
              <button type="button" onClick={applyChanges} className="button">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
