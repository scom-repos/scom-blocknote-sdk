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
    exports.WIDGET_URL = exports.WidgetMapping = exports.MediaBlockTypes = exports.CustomBlockTypes = void 0;
    ///<amd-module name='@scom/scom-blocknote-sdk/utils/config.ts'/> 
    exports.CustomBlockTypes = ['video', 'imageWidget', 'swap', 'chart', 'xchain', 'tweet', 'staking', 'voting', 'nftMinter', 'oswapNft', 'codeBlock'];
    exports.MediaBlockTypes = ['image', ...exports.CustomBlockTypes];
    exports.WidgetMapping = {
        video: {
            name: '@scom/scom-video',
            localPath: 'scom-video'
        },
        imageWidget: {
            name: '@scom/scom-image',
            localPath: 'scom-image'
        },
        swap: {
            name: '@scom/scom-swap',
            localPath: 'scom-swap'
        },
        staking: {
            name: '@scom/scom-staking',
            localPath: 'scom-staking'
        },
        xchain: {
            name: '@scom/scom-xchain-widget',
            localPath: 'scom-xchain-widget'
        },
        voting: {
            name: '@scom/scom-voting',
            localPath: 'scom-voting'
        },
        nftMinter: {
            name: '@scom/scom-nft-minter',
            localPath: 'scom-nft-minter'
        },
        oswapNft: {
            name: '@scom/oswap-nft-widget',
            localPath: 'oswap-nft-widget'
        }
    };
    exports.WIDGET_URL = 'https://widget.noto.fan';
});
define("@scom/scom-blocknote-sdk/utils/helper.ts", ["require", "exports", "@scom/scom-blocknote-sdk/utils/config.ts"], function (require, exports, config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getBlockFromExtension = exports.getFileType = exports.execCustomBLock = exports.getWidgetEmbedUrl = exports.parseUrl = exports.parseStringToObject = void 0;
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
    const getWidgetEmbedUrl = (block) => {
        const type = block.type;
        let module = null;
        if (type === 'chart') {
            module = {
                name: `@scom/${block.props?.name || 'scom-line-chart'}`,
                localPath: `${block.props?.name || 'scom-line-chart'}`
            };
        }
        else {
            module = config_1.WidgetMapping[type];
        }
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
    function getFileType(ext) {
        let result = '';
        const video = ['mp4', 'webm', 'mov', 'm3u8'];
        const image = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
        if (video.includes(ext)) {
            result = 'video';
        }
        else if (image.includes(ext)) {
            result = 'image';
        }
        return result;
    }
    exports.getFileType = getFileType;
    async function getBlockFromExtension(url) {
        let block = null;
        const ext = url.split('.').pop().toLowerCase();
        const fileType = getFileType(ext);
        switch (fileType) {
            case 'image':
                block = {
                    type: "imageWidget",
                    props: { url }
                };
                break;
            case 'video':
                block = {
                    type: "video",
                    props: { url }
                };
                break;
            default:
                block = {
                    type: 'paragraph',
                    content: [
                        {
                            type: "link",
                            content: [{
                                    type: "text",
                                    text: url,
                                    styles: {}
                                }],
                            href: url
                        }
                    ]
                };
                break;
        }
        return block;
    }
    exports.getBlockFromExtension = getBlockFromExtension;
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
