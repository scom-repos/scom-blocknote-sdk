import { Module } from "@ijstech/components";
import { Block, BlockNoteEditor, PartialBlock, SlashMenuItem } from "./coreType";

type executeFnType = (editor: BlockNoteEditor, block: PartialBlock) => void;
type callbackFnType = (module: Module, block: Block) => void;

interface BlockSpecs {
  addBlock: (blocknote: any, executeFn: executeFnType, callbackFn?: callbackFnType) => { block: Block, slashItem: SlashMenuItem };
}

export {
	BlockSpecs,
	executeFnType,
	callbackFnType
}