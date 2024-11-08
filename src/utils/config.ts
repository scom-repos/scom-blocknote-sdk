import { IBlockTypeItem } from "./interfaces";

export const CustomBlockTypes = ['video', 'imageWidget', 'swap', 'chart', 'xchain', 'tweet', 'staking', 'voting', 'nftMinter', 'oswapNft', 'codeBlock'];

export const MediaBlockTypes = ['image', ...CustomBlockTypes];

export const WidgetMapping: {[key: string]: {name: string, localPath: string}} = {
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
}

export const WIDGET_URL = 'https://widget.noto.fan';

export const defaultBlockTypeItems: IBlockTypeItem[] = [
  {
    name: "Paragraph",
    type: "paragraph",
    icon: {name: 'paragraph'},
    isSelected: (block) => block.type === "paragraph",
  },
  {
    name: "Heading 1",
    type: "heading",
    props: { level: 1 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 1,
  },
  {
    name: "Heading 2",
    type: "heading",
    props: { level: 2 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 2,
  },
  {
    name: "Heading 3",
    type: "heading",
    props: { level: 3 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 3,
  },
  {
    name: "Heading 4",
    type: "heading",
    props: { level: 4 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 4,
  },
  {
    name: "Heading 5",
    type: "heading",
    props: { level: 5 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 5,
  },
  {
    name: "Heading 6",
    type: "heading",
    props: { level: 6 },
    icon: {name: 'heading'},
    isSelected: (block) =>
      block.type === "heading" &&
      "level" in block.props &&
      block.props.level === 6,
  },
  {
    name: "Bullet List",
    type: "bulletListItem",
    icon: {name: 'list-ul'},
    isSelected: (block) => block.type === "bulletListItem",
  },
  {
    name: "Numbered List",
    type: "numberedListItem",
    icon: {name: 'list-ol'},
    isSelected: (block) => block.type === "numberedListItem",
  },
];
