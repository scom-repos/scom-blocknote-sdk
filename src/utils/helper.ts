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
