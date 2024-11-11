import { IconName, Module } from "@ijstech/components";
import { Block, BlockNoteEditor, PartialBlock, SlashMenuItem } from "./coreType";

type executeFnType = (editor: BlockNoteEditor, block: PartialBlock) => void;
type callbackFnType = (module: Module, block: Block) => void;
interface IModuleData {
  name: string;
  localPath: string;
}

interface BlockNoteSpecs {
  addBlock: (blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType) => { block: Block, slashItem: SlashMenuItem, moduleData: IModuleData };
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
}

type CustomSideMenuState = {
  referencePos: any;
  show: boolean;
  block: any;
}

type CustomSlashMenuState = {
  referencePos: any;
  show: boolean;
  filteredItems: any[];
  itemCallback: any;
  keyboardHoveredItemIndex: number;
}

type IBlockTypeItem = {
  name: string;
  type: string;
  props?: Record<string, boolean | number | string>;
  icon?: {name: IconName};
  isSelected: (block: any) => boolean;
};

export {
	BlockNoteSpecs,
	executeFnType,
	callbackFnType,
  IModuleData,
	CustomFormattingToolbarState,
	CustomHyperlinkToolbarState,
	CustomSideMenuState,
	CustomSlashMenuState,
	TextAlignmentType,
	IBlockTypeItem
}