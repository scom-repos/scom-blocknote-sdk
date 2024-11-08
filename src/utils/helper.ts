import { WIDGET_URL, WidgetMapping } from "./config";
import { BlockNoteEditor, PartialBlock } from "./coreType";

export const parseStringToObject = (value: string) => {
  try {
    const utf8String = decodeURIComponent(value);
    const decodedString = window.atob(utf8String);
    const newData = JSON.parse(decodedString);
    return { ...newData };
  } catch {}
  return null;
}

export function parseUrl(href: string) {
  if (href.startsWith(WIDGET_URL)) {
    let arr = href.split('/scom/');
    let paths = arr[1].split('/');
    const dataStr = paths.slice(1).join('/');
    return dataStr ? parseStringToObject(dataStr) : null;
  }
  return null;
}

export const getWidgetEmbedUrl = (block: PartialBlock) => {
  const type = block.type as string;
  let module = null;
  if (type === 'chart') {
    module = {
      name: `@scom/${block.props?.name || 'scom-line-chart'}`,
      localPath: `${block.props?.name || 'scom-line-chart'}`
    }
  } else {
    module = WidgetMapping[type];
  }
  if (module) {
    const widgetData = {
      module,
      properties: { ...block.props },
    };
    const encodedWidgetDataString = encodeURIComponent(window.btoa(JSON.stringify(widgetData)));
    const moduleName = module.name.slice(1);
    return `${WIDGET_URL}/#!/${moduleName}/${encodedWidgetDataString}`;
  }
  return '';
}

export const execCustomBLock = (editor: BlockNoteEditor, block: PartialBlock) => {
  const currentBlock = editor.getTextCursorPosition().block;
  if (
    Array.isArray(currentBlock.content) &&
    ((currentBlock.content.length === 1 &&
      currentBlock.content[0].type === "text" &&
      (currentBlock.content[0].text === "/" || !currentBlock.content[0].text)) ||
      currentBlock.content.length === 0)
  ) {
    editor.updateBlock(currentBlock, block);
  } else {
    editor.insertBlocks([block], currentBlock, "after");
  }
  editor.setTextCursorPosition(
    editor.getTextCursorPosition().nextBlock!,
    "end"
  );
}

export function getFileType(ext: string) {
  let result = '';
  const video = ['mp4', 'webm', 'mov', 'm3u8'];
  const image = ['jpg', 'jpeg', 'png', 'gif', 'svg'];
  if (video.includes(ext)) {
    result = 'video';
  } else if (image.includes(ext)) {
    result = 'image';
  }
  return result;
}

export async function getBlockFromExtension(url: string) {
  let block = null;
  const ext = url.split('.').pop().toLowerCase();
  const fileType = getFileType(ext);
  switch (fileType) {
    case 'image':
      block = {
        type: "imageWidget",
        props: { url }
      }
      break;
    case 'video':
      block = {
        type: "video",
        props: { url }
      }
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
      }
      break;
  }
  return block
}

export const isAppleOS = () =>
  typeof navigator !== "undefined" &&
  (/Mac/.test(navigator.platform) ||
    (/AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent)));

export function formatKeyboardShortcut(shortcut: string) {
  if (isAppleOS()) {
    return shortcut.replace("Mod", "&#8984;");
  } else {
    return shortcut.replace("Mod", "Ctrl");
  }
}

const twitterImg = "data:image/svg+xml,%3Csvg%20viewBox%3D%270%200%2032%2032%27%20fill%3D%27none%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect%20width%3D%2732%27%20height%3D%2732%27%20fill%3D%27none%27%2F%3E%3Cpath%20d%3D%27M17.9686%2014.1623L26.7065%204H24.6358L17.0488%2012.8238L10.9891%204H4L13.1634%2017.3432L4%2028H6.07069L14.0827%2018.6817L20.4822%2028H27.4714L17.9681%2014.1623H17.9686ZM15.1326%2017.4607L14.2041%2016.132L6.81679%205.55961H9.99723L15.9589%2014.0919L16.8873%2015.4206L24.6368%2026.5113H21.4564L15.1326%2017.4612V17.4607Z%27%20fill%3D%27white%27%2F%3E%3C%2Fsvg%3E";

export function getExtraFields () {
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
    Image: {
      group: "Media",
      icon: { name: 'image' },
      hint: "Insert an image",
    },
    'Image Widget': {
      group: "Media",
      icon: { name: 'image' },
      hint: "Insert an image",
    },
    'Video': {
      group: "Media",
      icon: {name: 'video'},
      hint: "Insert a video",
    },
    Swap: {
      group: "Widget",
      icon: {name: 'exchange-alt'},
      hint: "Insert a swap widget",
    },
    Xchain: {
      group: "Widget",
      icon: {name: 'exchange-alt'},
      hint: "Insert an xchain widget",
    },
    Table: {
      group: "Basic blocks",
      icon: { name: 'table' },
      hint: "Create a table"
    },
    Chart: {
      group: "Widget",
      icon: {name: 'chart-line'},
      hint: "Insert a chart widget",
    },
    Tweet: {
      group: "Widget",
      icon: {image: {url: twitterImg, width: '100%', height: '100%', display: 'inline-block'}},
      hint: "Insert a twitter post",
    },
    File: {
      group: "Media",
      icon: {name: 'file'},
      hint: "Insert a file",
    },
    Staking: {
      group: "Widget",
      icon: { name: 'hand-holding-usd' },
      hint: "Insert a staking widget"
    },
    Voting: {
      group: "Widget",
      icon: { name: 'vote-yea' },
      hint: "Insert a voting widget"
    },
    "NFT Minter": {
      group: "Widget",
      icon: { name: 'gavel' },
      hint: "Insert a NFT minter widget"
    },
    'Oswap NFT': {
      group: "Widget",
      icon: { name: 'campground' },
      hint: "Insert an Oswap NFT widget"
    },
    'Code Block': {
      group: "Basic blocks",
      icon: { name: 'code' },
      hint: "Insert a code block"
    }
  };
  return extraFields;
}