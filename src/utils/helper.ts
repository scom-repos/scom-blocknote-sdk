import { WIDGET_URL } from "./config";
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

export const getWidgetEmbedUrl = (block: PartialBlock, module: {name: string, localPath: string}) => {
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
      icon: {name: 'file'},
      hint: "Insert a file",
    }
  };
  return extraFields;
}