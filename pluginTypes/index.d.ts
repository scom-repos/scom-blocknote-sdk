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
        group?: string;
        icon?: any;
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
    import { IconName, Module } from "@ijstech/components";
    import { Block, BlockNoteEditor, PartialBlock, SlashMenuItem } from "@scom/scom-blocknote-sdk/utils/coreType.ts";
    type executeFnType = (editor: BlockNoteEditor, block: PartialBlock) => void;
    type callbackFnType = (module: Module, block: Block) => void;
    interface IModuleData {
        name: string;
        localPath: string;
    }
    interface BlockNoteSpecs {
        addBlock: (blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType) => {
            block: Block;
            slashItem: SlashMenuItem;
            moduleData: IModuleData;
        };
    }
    type TextAlignmentType = "left" | "center" | "right" | "justify";
    type CustomFormattingToolbarState = {
        bold: boolean;
        italic: boolean;
        underline: boolean;
        textAlignment: TextAlignmentType;
        textColor: string;
        backgroundColor: string;
        referencePos: any;
        show: boolean;
    };
    type CustomHyperlinkToolbarState = {
        text: string;
        url: string;
        referencePos: any;
        show: boolean;
    };
    type CustomSideMenuState = {
        referencePos: any;
        show: boolean;
        block: any;
    };
    type CustomSlashMenuState = {
        referencePos: any;
        show: boolean;
        filteredItems: any[];
        itemCallback: any;
        keyboardHoveredItemIndex: number;
    };
    type IBlockTypeItem = {
        name: string;
        type: string;
        props?: Record<string, boolean | number | string>;
        icon?: {
            name: IconName;
        };
        isSelected: (block: any) => boolean;
    };
    export { BlockNoteSpecs, executeFnType, callbackFnType, IModuleData, CustomFormattingToolbarState, CustomHyperlinkToolbarState, CustomSideMenuState, CustomSlashMenuState, TextAlignmentType, IBlockTypeItem };
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/config.ts" />
declare module "@scom/scom-blocknote-sdk/utils/config.ts" {
    import { IBlockTypeItem } from "@scom/scom-blocknote-sdk/utils/interfaces.ts";
    export const BasicBlockTypes: string[];
    export const WIDGET_URL = "https://widget.noto.fan";
    export const defaultBlockTypeItems: IBlockTypeItem[];
}
/// <amd-module name="@scom/scom-blocknote-sdk/utils/helper.ts" />
declare module "@scom/scom-blocknote-sdk/utils/helper.ts" {
    import { BlockNoteEditor, PartialBlock } from "@scom/scom-blocknote-sdk/utils/coreType.ts";
    export const parseStringToObject: (value: string) => any;
    export function parseUrl(href: string): any;
    export const getWidgetEmbedUrl: (block: PartialBlock, module: {
        name: string;
        localPath: string;
    }) => string;
    export const execCustomBLock: (editor: BlockNoteEditor, block: PartialBlock) => void;
    export const isAppleOS: () => boolean;
    export function formatKeyboardShortcut(shortcut: string): string;
    export function getExtraFields(): {
        Heading: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 2": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 3": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 4": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 5": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Heading 6": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Numbered List": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        "Bullet List": {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        Paragraph: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
            shortcut: string;
        };
        Table: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
        'Code Block': {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
        File: {
            group: string;
            icon: {
                name: string;
            };
            hint: string;
        };
    };
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
