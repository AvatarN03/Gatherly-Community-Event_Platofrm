export const getSlateText = (value: string): string => {
    try {
        const nodes = JSON.parse(value);

        if (!Array.isArray(nodes)) {
            return "";
        }

        return nodes
            .map((node) =>
                node.children
                    ?.map((child: { text?: string }) => child.text ?? "")
                    .join("") ?? ""
            )
            .join("\n")
            .trim();
    } catch {
        return "";
    }
};