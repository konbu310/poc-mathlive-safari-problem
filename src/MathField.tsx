import type { MathfieldElement } from "mathlive";
import { FC, InputEventHandler, RefObject, useEffect } from "react";

const showMathKeyboard = () => {
  window.mathVirtualKeyboard.show({ animate: true });
};

const hideMathKeyboard = () => {
  window.mathVirtualKeyboard.hide({ animate: true });
};

export const MathField: FC<{
  value: string;
  onInput: InputEventHandler<MathfieldElement>;
  className: string;
  nodeRef: RefObject<MathfieldElement | null>;
}> = ({ value, onInput, className, nodeRef }) => {
  useEffect(() => {
    const mf = nodeRef.current;
    if (!mf) return;
    mf.mathVirtualKeyboardPolicy = "sandboxed";
    mf.menuItems = [];
    mf.keybindings = mf.keybindings.filter(({ command }) => {
      return !(command[0] === "switchMode" && command[1] === "latex");
    });
    mf.focus();
    const length = mf.textContent?.length ?? 0;
    mf.selection = { ranges: [[length, length]] };
    showMathKeyboard();

    return () => {
      hideMathKeyboard();
    };
  }, [nodeRef]);

  return (
    <math-field
      ref={nodeRef}
      onInput={onInput}
      style={{ width: "100%" }}
      className={className}
      autoFocus={false}
    >
      {value}
    </math-field>
  );
};
