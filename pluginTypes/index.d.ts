/// <amd-module name="@scom/scom-blocknote-sdk/utils/coreType.ts" />
declare module "@scom/scom-blocknote-sdk/utils/coreType.ts" {
    import { Control } from "@ijstech/components";
    export type Styles = {
        bold?: true;
        italic?: true;
        underline?: true;
        strike?: true;
        code?: true;
        textColor?: string;
        backgroundColor?: string;
    };
    export type ToggledStyle = {
        [K in keyof Styles]-?: Required<Styles>[K] extends true ? K : never;
    }[keyof Styles];
    export type ColorStyle = {
        [K in keyof Styles]-?: Required<Styles>[K] extends string ? K : never;
    }[keyof Styles];
    export type StyledText = {
        type: "text";
        text: string;
        styles: Styles;
    };
    export type Link = {
        type: "link";
        href: string;
        content: StyledText[];
    };
    export type PartialLink = Omit<Link, "content"> & {
        content: string | Link["content"];
    };
    export type InlineContent = Link | StyledText;
    export type PartialInlineContent = StyledText | PartialLink;
    export type PartialBlock = {
        id?: string;
        type?: string;
        props?: Partial<Record<string, string>>;
        content?: string | InlineContent[];
        children?: any[];
    };
    export type Block = {
        id: string;
        type: boolean | number | string;
        props: Record<string, string>;
        content: InlineContent[];
        children: Block[];
    };
    export type BlockIdentifier = string | Block;
    export type SlashMenuItem = {
        name: string;
        execute: (editor: any) => void;
        aliases?: string[];
        group: string;
        icon: any;
        hint?: string;
        shortcut?: string;
    };
    export type BlockNoteEditor = any;
    export type BlockNoteDOMElement = "editor" | "blockContainer" | "blockGroup" | "blockContent" | "inlineContent";
    export type BlockNoteDOMAttributes = Partial<{
        [DOMElement in BlockNoteDOMElement]: Record<string, string>;
    }>;
    export type BlockNoteEditorOptions = Partial<{
        parentElement: Control;
        editable: boolean;
        initialContent: PartialBlock[];
        blockSpecs: any;
        editorDOMAttributes: Record<string, string>;
        onEditorReady: (editor: BlockNoteEditor) => void;
        onEditorContentChange: (editor: BlockNoteEditor) => void;
        onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
        slashMenuItems: SlashMenuItem[];
        defaultStyles: boolean;
        uploadFile: (file: File) => Promise<string>;
        domAttributes: Partial<BlockNoteDOMAttributes>;
    }>;
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/interfaces.ts" />
declare module "@scom/scom-blocknote-sdk/utils/interfaces.ts" {
    import { Module } from "@ijstech/components";
    import { Block, BlockNoteEditor, PartialBlock, SlashMenuItem } from "@scom/scom-blocknote-sdk/utils/coreType.ts";
    type executeFnType = (editor: BlockNoteEditor, block: PartialBlock) => void;
    type callbackFnType = (module: Module, block: Block) => void;
    interface BlockSpecs {
        addBlock: (blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType) => {
            block: Block;
            slashItem: SlashMenuItem;
        };
    }
    export { BlockSpecs, executeFnType, callbackFnType };
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/config.ts" />
declare module "@scom/scom-blocknote-sdk/utils/config.ts" {
    export const CustomBlockTypes: string[];
    export const MediaBlockTypes: string[];
    export const WidgetMapping: {
        [key: string]: {
            name: string;
            localPath: string;
        };
    };
    export const WIDGET_URL = "https://widget.noto.fan";
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/helper.ts" />
declare module "@scom/scom-blocknote-sdk/utils/helper.ts" {
    import { BlockNoteEditor, PartialBlock } from "@scom/scom-blocknote-sdk/utils/coreType.ts";
    export const parseStringToObject: (value: string) => any;
    export function parseUrl(href: string): any;
    export const getWidgetEmbedUrl: (block: PartialBlock) => string;
    export const execCustomBLock: (editor: BlockNoteEditor, block: PartialBlock) => void;
    export function getFileType(ext: string): string;
    export function getBlockFromExtension(url: string): Promise<any>;
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/index.ts" />
declare module "@scom/scom-blocknote-sdk/utils/index.ts" {
    export * from "@scom/scom-blocknote-sdk/utils/interfaces.ts";
    export * from "@scom/scom-blocknote-sdk/utils/config.ts";
    export * from "@scom/scom-blocknote-sdk/utils/helper.ts";
    export * from "@scom/scom-blocknote-sdk/utils/coreType.ts";
}
/// <amd-module name="@scom/scom-blocknote-sdk" />
declare module "@scom/scom-blocknote-sdk" {
    export * from "@scom/scom-blocknote-sdk/utils/index.ts";
}
