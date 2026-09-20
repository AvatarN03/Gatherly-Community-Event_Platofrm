import {createEditor, type Descendant} from "slate";
import {
    Editable,
    Slate,
    withReact,
    type RenderElementProps,
    type RenderLeafProps,
} from "slate-react";
import {withHistory} from "slate-history";
import {useCallback, useMemo} from "react";
import type {CustomEditor} from "../../types/editor";
import {deserialize, toggleMark, withEmptyReset} from "../../lib/editor";
import Element from "./Element.tsx";
import Leaf from "./Leaf";
import Toolbar from "./Toolbar.tsx";

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
};

const RichTextEditor = ({
                            value,
                            onChange,
                            disabled = false,
                            placeholder = "Write something...",
                        }: RichTextEditorProps) => {
    const editor = useMemo<CustomEditor>(
        () => withEmptyReset(withHistory(withReact(createEditor()))),
        []
    );

    const editorValue = useMemo(() => deserialize(value ?? ""), [value]);

    const renderElement = useCallback(
        (props: RenderElementProps) => <Element {...props} />,
        []
    );

    const renderLeaf = useCallback(
        (props: RenderLeafProps) => <Leaf {...props} />,
        []
    );

    const handleChange = (newValue: Descendant[]) => {
        onChange(JSON.stringify(newValue));
    };

    return (
        <div
            className={`
                overflow-hidden
                border
                border-teal-200
                bg-teal-200
                rounded-md
                shadow-sm
                
                shadow-teal-100
                transition-colors
                ${disabled ? "opacity-70" : ""}
            `}
        >
            <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
                <Toolbar editor={editor} disabled={disabled}/>

                <Editable
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder={placeholder}
                        readOnly={disabled}
                        spellCheck
                        className="
                        min-h-32
                        w-full
                        p-4
                        text-sm
                        max-h-100
                        overflow-hidden
                        overflow-y-auto
                        text-teal-900
                        outline-none
                        placeholder:text-teal-700/50
                    "
                        onKeyDown={(event) => {
                            if (!event.ctrlKey && !event.metaKey) {
                                return;
                            }

                            switch (event.key) {
                                case "b":
                                    event.preventDefault();
                                    toggleMark(editor, "bold");
                                    break;

                                case "i":
                                    event.preventDefault();
                                    toggleMark(editor, "italic");
                                    break;

                                case "u":
                                    event.preventDefault();
                                    toggleMark(editor, "underline");
                                    break;
                            }
                        }}
                    />

            </Slate>
        </div>
    );
};

export default RichTextEditor;