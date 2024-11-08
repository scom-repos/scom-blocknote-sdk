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
