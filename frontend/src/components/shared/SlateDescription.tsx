import { useMemo } from "react";
import { createEditor, type Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const SlateDescription = ({ value }: { value: string }) => {
    const editor = useMemo(() => withReact(createEditor()), []);

    const initialValue: Descendant[] = JSON.parse(value);

    const renderLeaf = ({ attributes, children, leaf }: any) => {
        if (leaf.bold) {
            children = <strong>{children}</strong>;
        }

        if (leaf.italic) {
            children = <em>{children}</em>;
        }

        if (leaf.underline) {
            children = <u>{children}</u>;
        }

        return <span {...attributes}>{children}</span>;
    };

    const renderElement = ({ attributes, children }: any) => {
        return <p {...attributes}>{children}</p>;
    };

    return (
        <Slate
            editor={editor}
            initialValue={initialValue}
        >
            <Editable
                readOnly
                renderLeaf={renderLeaf}
                renderElement={renderElement}
            />
        </Slate>
    );
};

export default SlateDescription;