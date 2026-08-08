type MarkButtonProps = {
    editor: Editor;
    format: "bold" | "italic" | "underline";
    disabled: boolean;
    children: React.ReactNode;
};

const MarkButton = ({
                        editor,
                        format,
                        disabled,
                        children,
                    }: MarkButtonProps) => {
    const active = isMarkActive(editor, format);

    return (
        <button
            type="button"
            disabled={disabled}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleMark(editor, format);
            }}
            className={`
                p-1.5
                transition-colors
                disabled:cursor-not-allowed
                disabled:opacity-40
                ${
                active
                    ? "bg-fog/15 text-cocoa"
                    : "text-stone hover:bg-fog/10 hover:text-mist"
            }
            `}
        >
            {children}
        </button>
    );
};