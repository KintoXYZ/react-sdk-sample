export const IS_DEV = process.env.NODE_ENV === 'development';
export const IS_PROD = process.env.NODE_ENV === 'production';
export const BASE_DOMAIN_URL = IS_DEV ? 'http://localhost:8888' : 'https://kinto.xyz';
export const UNDER_MAINTENANCE = process.env.REACT_APP_UNDER_MAINTENANCE === 'true' || false;
export const ENV_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || '7887');
export const IS_MAINNET = ENV_CHAIN_ID === 7887;
export const DOCS_URL = 'https://docs.kinto.xyz/';
export const LITEPAPER_URL = 'https://docs.kinto.xyz/litepaper';
export const BASE_IPFS_GATEWAY_URL = 'https://kinto.mypinata.cloud/ipfs/';
export const APP_URL = 'https://www.kinto.xyz/';
export const TWITTER_URL = 'https://twitter.com/KintoXYZ';
export const GITHUB_URL = 'https://github.com/kintoxyz';
export const MIRROR_URL = 'https://mirror.xyz/kintoxyz.eth';
export const DISCORD_INVITE_URL = 'https://discord.com/invite/kinto?a=1';
export const CONTACT_EMAIL = 'contact@kinto.xyz';
export const INBOUND_EMAIL = 'contact@kinto.xyz';
export const APP_NAME = 'Kinto.xyz';
export const MAIN_DISCORD_INVITE_LINK = 'https://discord.gg/kintoxyz';
export const DEFAULT_CHAIN = 7887;

export const RPC_URL= process.env.REACT_APP_KINTO_NODE_URL || 'https://rpc.kinto.xyz';
export const WSS_URL= process.env.REACT_APP_KINTO_WEBSOCKET_URL || 'wss://rpc.kinto.xyz/ws';
export const EXPLORER_URL = process.env.REACT_APP_KINTO_EXPLORER_URL || 'https://kintoscan.io';

export const BREAKPOINTS = {
  large: '1440px',
  standard: '1280px',
  tablet: '1024px',
  bmobile: '860px',
  mobile: '598px',
  smobile: '400px',
};