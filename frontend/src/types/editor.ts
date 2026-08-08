import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";
import type { HistoryEditor } from "slate-history";

export type CustomElement = {
    type: "paragraph" | "heading-two" | "bulleted-list" | "numbered-list" | "list-item";
    children: CustomText[];
};

export type CustomText = {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
};

// The real shape of an editor built with withReact(withHistory(createEditor())).
// Using this instead of the bare `Editor` interface is what lets TypeScript
// know about ReactEditor/HistoryEditor methods without a `@ts-ignore`.
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module "slate" {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

export const LIST_TYPES: CustomElement["type"][] = ["bulleted-list", "numbered-list"];

export type MarkFormat = "bold" | "italic" | "underline";