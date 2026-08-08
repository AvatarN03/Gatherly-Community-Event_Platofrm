import { Editor, Element as SlateElement, Transforms, type Descendant } from "slate";
import type { CustomEditor, CustomElement, MarkFormat } from "../types/editor";
import { LIST_TYPES } from "../types/editor";

export const EMPTY_VALUE: Descendant[] = [
    {
        type: "paragraph",
        children: [{ text: "" }],
    },
];

export const deserialize = (value: string): Descendant[] => {
    if (!value) return EMPTY_VALUE;

    try {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
            return parsed as Descendant[];
        }

        return EMPTY_VALUE;
    } catch {
        return [
            {
                type: "paragraph",
                children: [{ text: value }],
            },
        ];
    }
};

export const isMarkActive = (editor: CustomEditor, format: MarkFormat): boolean => {
    const marks = Editor.marks(editor);

    return marks ? marks[format] === true : false;
};

export const toggleMark = (editor: CustomEditor, format: MarkFormat): void => {
    const active = isMarkActive(editor, format);

    if (active) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

export const isBlockActive = (
    editor: CustomEditor,
    format: CustomElement["type"]
): boolean => {
    const { selection } = editor;
    if (!selection) return false;

    const [match] = Array.from(
        Editor.nodes(editor, {
            at: Editor.unhangRange(editor, selection),
            match: (node) =>
                !Editor.isEditor(node) &&
                SlateElement.isElement(node) &&
                node.type === format,
        })
    );

    return !!match;
};

// Handles both simple blocks (paragraph, heading) and list blocks, which
// need a wrapping list node (ul/ol) plus list-item children rather than a
// single node whose `type` is just set to "bulleted-list"/"numbered-list".
export const toggleBlock = (editor: CustomEditor, format: CustomElement["type"]): void => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (node) =>
            !Editor.isEditor(node) &&
            SlateElement.isElement(node) &&
            LIST_TYPES.includes(node.type),
        split: true,
    });

    Transforms.setNodes<CustomElement>(editor, {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    });

    if (!isActive && isList) {
        Transforms.wrapNodes(editor, { type: format, children: [] });
    }
};

// Once the document is cleared back to a single, fully empty block, drop any
// lingering block formatting (list item, heading) instead of leaving a
// bullet or heading style attached to nothing. Without this, selecting all
// text inside a list item (or a heading) and deleting it leaves the empty
// <li>/<h2> behind with no way to type your way back to a plain paragraph.
export const withEmptyReset = (editor: CustomEditor): CustomEditor => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        // A list that has lost all of its items is invalid — drop the wrapper
        // rather than leaving an empty <ul>/<ol> in the document.
        if (
            SlateElement.isElement(node) &&
            LIST_TYPES.includes(node.type) &&
            node.children.length === 0
        ) {
            Transforms.removeNodes(editor, { at: path });
            return;
        }

        // Root-level check: is the entire document now a single empty block?
        if (
            path.length === 0 &&
            editor.children.length === 1 &&
            Editor.string(editor, []) === ""
        ) {
            const [onlyChild] = editor.children as CustomElement[];

            if (SlateElement.isElement(onlyChild) && onlyChild.type !== "paragraph") {
                Transforms.removeNodes(editor, { at: [0] });
                Transforms.insertNodes(
                    editor,
                    { type: "paragraph", children: [{ text: "" }] },
                    { at: [0] }
                );
                return;
            }
        }

        normalizeNode(entry);
    };

    return editor;
};