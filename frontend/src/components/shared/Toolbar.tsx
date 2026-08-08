import type { MouseEvent } from "react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Undo2,
    Redo2,
    type LucideIcon,
} from "lucide-react";
import { HistoryEditor } from "slate-history";
import type { CustomEditor, CustomElement, MarkFormat } from "../../types/editor";
import { isMarkActive, isBlockActive, toggleMark, toggleBlock } from "../../lib/editor";

type ToolbarButtonProps = {
    active: boolean;
    disabled?: boolean;
    onMouseDown: (event: MouseEvent) => void;
    Icon: LucideIcon;
    label: string;
};

const ToolbarButton = ({ active, disabled, onMouseDown, Icon, label }: ToolbarButtonProps) => (
    <button
        type="button"
        disabled={disabled}
        onMouseDown={onMouseDown}
        aria-label={label}
        aria-pressed={active}
        className={`
            rounded
            p-1.5
            transition-colors
            disabled:pointer-events-none
            disabled:opacity-50
            ${active ? "bg-fog/20 text-mist" : "text-fog/60 hover:bg-fog/10 hover:text-mist"}
        `}
    >
        <Icon size={16} />
    </button>
);

type ToolbarProps = {
    editor: CustomEditor;
    disabled?: boolean;
};

const Toolbar = ({ editor, disabled }: ToolbarProps) => {
    const runMark = (format: MarkFormat) => (event: MouseEvent) => {
        event.preventDefault();
        toggleMark(editor, format);
    };

    const runBlock = (format: CustomElement["type"]) => (event: MouseEvent) => {
        event.preventDefault();
        toggleBlock(editor, format);
    };

    return (
        <div className="flex items-center gap-1 border-b border-fog/20 bg-night/80 px-2 py-1.5">
            <ToolbarButton
                active={isMarkActive(editor, "bold")}
                disabled={disabled}
                onMouseDown={runMark("bold")}
                Icon={Bold}
                label="Bold"
            />
            <ToolbarButton
                active={isMarkActive(editor, "italic")}
                disabled={disabled}
                onMouseDown={runMark("italic")}
                Icon={Italic}
                label="Italic"
            />
            <ToolbarButton
                active={isMarkActive(editor, "underline")}
                disabled={disabled}
                onMouseDown={runMark("underline")}
                Icon={Underline}
                label="Underline"
            />

            <div className="mx-1 h-4 w-px bg-fog/20" />

            <ToolbarButton
                active={isBlockActive(editor, "bulleted-list")}
                disabled={disabled}
                onMouseDown={runBlock("bulleted-list")}
                Icon={List}
                label="Bulleted list"
            />
            <ToolbarButton
                active={isBlockActive(editor, "numbered-list")}
                disabled={disabled}
                onMouseDown={runBlock("numbered-list")}
                Icon={ListOrdered}
                label="Numbered list"
            />

            <div className="mx-1 h-4 w-px bg-fog/20" />

            <ToolbarButton
                active={false}
                disabled={disabled}
                onMouseDown={(event) => {
                    event.preventDefault();
                    if (HistoryEditor.isHistoryEditor(editor)) {
                        HistoryEditor.undo(editor);
                    }
                }}
                Icon={Undo2}
                label="Undo"
            />
            <ToolbarButton
                active={false}
                disabled={disabled}
                onMouseDown={(event) => {
                    event.preventDefault();
                    if (HistoryEditor.isHistoryEditor(editor)) {
                        HistoryEditor.redo(editor);
                    }
                }}
                Icon={Redo2}
                label="Redo"
            />
        </div>
    );
};

export default Toolbar;