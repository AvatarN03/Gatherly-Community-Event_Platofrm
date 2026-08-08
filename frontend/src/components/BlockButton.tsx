type BlockButtonProps = {
    editor: Editor;
    format: "bulleted-list" | "numbered-list";
    disabled: boolean;
    children: React.ReactNode;
};

const BlockButton = ({
                         editor,
                         format,
                         disabled,
                         children,
                     }: BlockButtonProps) => {
    const active = isBlockActive(editor, format);

    return (
        <button
            type="button"
            disabled={disabled}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
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