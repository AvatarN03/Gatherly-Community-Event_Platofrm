import type { RenderElementProps } from "slate-react";

const Element = ({ attributes, children, element }: RenderElementProps) => {
    switch (element.type) {
        case "heading-two":
            return (
                <h2 {...attributes} className="mb-2 text-lg font-semibold text-mist">
                    {children}
                </h2>
            );

        case "bulleted-list":
            return (
                <ul {...attributes} className="list-disc space-y-1 pl-6">
                    {children}
                </ul>
            );

        case "numbered-list":
            return (
                <ol {...attributes} className="list-decimal space-y-1 pl-6">
                    {children}
                </ol>
            );

        case "list-item":
            return <li {...attributes}>{children}</li>;

        default:
            return (
                <p {...attributes} className="mb-1">
                    {children}
                </p>
            );
    }
};

export default Element;