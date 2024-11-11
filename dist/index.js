var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define("@scom/scom-blocknote-sdk/utils/coreType.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-blocknote-sdk/utils/interfaces.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-blocknote-sdk/utils/config.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultBlockTypeItems = exports.WIDGET_URL = exports.BasicBlockTypes = void 0;
    exports.BasicBlockTypes = ['paragraph', 'heading', 'bulletListItem', 'numberedListItem', 'table'];
    exports.WIDGET_URL = 'https://widget.noto.fan';
    exports.defaultBlockTypeItems = [
        {
            name: "Paragraph",
            type: "paragraph",
            icon: { name: 'paragraph' },
            isSelected: (block) => block.type === "paragraph",
        },
        {
            name: "Heading 1",
            type: "heading",
            props: { level: 1 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 1,
        },
        {
            name: "Heading 2",
            type: "heading",
            props: { level: 2 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 2,
        },
        {
            name: "Heading 3",
            type: "heading",
            props: { level: 3 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 3,
        },
        {
            name: "Heading 4",
            type: "heading",
            props: { level: 4 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 4,
        },
        {
            name: "Heading 5",
            type: "heading",
            props: { level: 5 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 5,
        },
        {
            name: "Heading 6",
            type: "heading",
            props: { level: 6 },
            icon: { name: 'heading' },
            isSelected: (block) => block.type === "heading" &&
                "level" in block.props &&
                block.props.level === 6,
        },
        {
            name: "Bullet List",
            type: "bulletListItem",
            icon: { name: 'list-ul' },
            isSelected: (block) => block.type === "bulletListItem",
        },
        {
            name: "Numbered List",
            type: "numberedListItem",
            icon: { name: 'list-ol' },
            isSelected: (block) => block.type === "numberedListItem",
        },
    ];
});
define("@scom/scom-blocknote-sdk/utils/helper.ts", ["require", "exports", "@scom/scom-blocknote-sdk/utils/config.ts"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getExtraFields = exports.formatKeyboardShortcut = exports.isAppleOS = exports.execCustomBLock = exports.getWidgetEmbedUrl = exports.parseUrl = exports.parseStringToObject = void 0;
    const parseStringToObject = (value) => {
        try {
            const utf8String = decodeURIComponent(value);
            const decodedString = window.atob(utf8String);
            const newData = JSON.parse(decodedString);
            return { ...newData };
        }
        catch { }
        return null;
    };
    exports.parseStringToObject = parseStringToObject;
    function parseUrl(href) {
        if (href.startsWith(config_1.WIDGET_URL)) {
            let arr = href.split('/scom/');
            let paths = arr[1].split('/');
            const dataStr = paths.slice(1).join('/');
            return dataStr ? (0, exports.parseStringToObject)(dataStr) : null;
        }
        return null;
    }
    exports.parseUrl = parseUrl;
    const getWidgetEmbedUrl = (block, module) => {
        if (module) {
            const widgetData = {
                module,
                properties: { ...block.props },
            };
            const encodedWidgetDataString = encodeURIComponent(window.btoa(JSON.stringify(widgetData)));
            const moduleName = module.name.slice(1);
            return `${config_1.WIDGET_URL}/#!/${moduleName}/${encodedWidgetDataString}`;
        }
        return '';
    };
    exports.getWidgetEmbedUrl = getWidgetEmbedUrl;
    const execCustomBLock = (editor, block) => {
        const currentBlock = editor.getTextCursorPosition().block;
        if (Array.isArray(currentBlock.content) &&
            ((currentBlock.content.length === 1 &&
                currentBlock.content[0].type === "text" &&
                (currentBlock.content[0].text === "/" || !currentBlock.content[0].text)) ||
                currentBlock.content.length === 0)) {
            editor.updateBlock(currentBlock, block);
        }
        else {
            editor.insertBlocks([block], currentBlock, "after");
        }
        editor.setTextCursorPosition(editor.getTextCursorPosition().nextBlock, "end");
    };
    exports.execCustomBLock = execCustomBLock;
    const isAppleOS = () => typeof navigator !== "undefined" &&
        (/Mac/.test(navigator.platform) ||
            (/AppleWebKit/.test(navigator.userAgent) &&
                /Mobile\/\w+/.test(navigator.userAgent)));
    exports.isAppleOS = isAppleOS;
    function formatKeyboardShortcut(shortcut) {
        if ((0, exports.isAppleOS)()) {
            return shortcut.replace("Mod", "&#8984;");
        }
        else {
            return shortcut.replace("Mod", "Ctrl");
        }
    }
    exports.formatKeyboardShortcut = formatKeyboardShortcut;
    function getExtraFields() {
        const extraFields = {
            Heading: {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for a top-level heading",
                shortcut: formatKeyboardShortcut("Mod-Alt-1"),
            },
            "Heading 2": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for key sections",
                shortcut: formatKeyboardShortcut("Mod-Alt-2"),
            },
            "Heading 3": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for subsections and group headings",
                shortcut: formatKeyboardShortcut("Mod-Alt-3"),
            },
            "Heading 4": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for subsections and group headings",
                shortcut: formatKeyboardShortcut("Mod-Alt-4"),
            },
            "Heading 5": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for subsections and group headings",
                shortcut: formatKeyboardShortcut("Mod-Alt-5"),
            },
            "Heading 6": {
                group: "Headings",
                icon: { name: 'heading' },
                hint: "Used for subsections and group headings",
                shortcut: formatKeyboardShortcut("Mod-Alt-6"),
            },
            "Numbered List": {
                group: "Basic blocks",
                icon: { name: 'list-ol' },
                hint: "Used to display a numbered list",
                shortcut: formatKeyboardShortcut("Mod-Alt-7"),
            },
            "Bullet List": {
                group: "Basic blocks",
                icon: { name: 'list-ul' },
                hint: "Used to display an unordered list",
                shortcut: formatKeyboardShortcut("Mod-Alt-9"),
            },
            Paragraph: {
                group: "Basic blocks",
                icon: { name: 'paragraph' },
                hint: "Used for the body of your document",
                shortcut: formatKeyboardShortcut("Mod-Alt-0"),
            },
            Table: {
                group: "Basic blocks",
                icon: { name: 'table' },
                hint: "Create a table"
            },
            'Code Block': {
                group: "Basic blocks",
                icon: { name: 'code' },
                hint: "Insert a code block"
            },
            File: {
                group: "Media",
                icon: { name: 'file' },
                hint: "Insert a file",
            }
        };
        return extraFields;
    }
    exports.getExtraFields = getExtraFields;
});
define("@scom/scom-blocknote-sdk/utils/index.ts", ["require", "exports", "@scom/scom-blocknote-sdk/utils/interfaces.ts", "@scom/scom-blocknote-sdk/utils/config.ts", "@scom/scom-blocknote-sdk/utils/helper.ts", "@scom/scom-blocknote-sdk/utils/coreType.ts"], function (require, exports, interfaces_1, config_2, helper_1, coreType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-blocknote-sdk/utils/index.ts'/> 
    __exportStar(interfaces_1, exports);
    __exportStar(config_2, exports);
    __exportStar(helper_1, exports);
    __exportStar(coreType_1, exports);
});
define("@scom/scom-blocknote-sdk", ["require", "exports", "@scom/scom-blocknote-sdk/utils/index.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-blocknote-sdk'/> 
    __exportStar(utils_1, exports);
});
