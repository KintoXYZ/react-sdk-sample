import { TxCall, KintoAccountInfo } from './utils/';

// Popup Dimensions
const width = 400;
const height = 700;

class KintoSDK {
  private kintoUrl: string;
  private appAddress: string;
  private iframeId: string;
  private modalId: string;

  constructor(appAddress: string) {
    this.kintoUrl = 'https://engen.kinto.xyz';
    this.appAddress = appAddress;
    this.iframeId = 'kinto-sdk-iframe';
    this.modalId = 'kinto-sdk-modal';
  }

  async connect():Promise<KintoAccountInfo> {
    let iframe = document.getElementById(this.iframeId) as HTMLIFrameElement;
    let modal = document.getElementById(this.modalId) as HTMLDivElement;
    if (!iframe || !modal) {
      iframe = document.createElement('iframe');
      iframe.id = 'kinto-sdk-iframe';
      iframe.src = `${this.kintoUrl}/connect?appDomain=${encodeURIComponent(window.location.origin)}&appAddress=${this.appAddress}`;
      iframe.allow = 'publickey-credentials-get *'; // Allow WebAuthn API

      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';

      // Create a modal container
      modal = document.createElement('div');
      modal.id = 'kinto-sdk-modal';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modal.style.display = 'none';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';

      // Create a content container for the iframe
      const modalContent = document.createElement('div');
      modalContent.style.width = '100%';
      modalContent.style.height = '100%';
      modalContent.style.backgroundColor = 'white';
      modalContent.style.borderRadius = '8px';
      modalContent.style.overflow = 'hidden';
      modalContent.appendChild(iframe);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);
    }
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== this.kintoUrl) return;
        if (event.data.type === 'KINTO_ACCOUNT_INFO') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.accountInfo);
          modal.style.display = 'none';
        } else if (event.data.type === 'KINTO_CONNECTION_ERROR') {
          window.removeEventListener('message', handleMessage);
          modal.style.display = 'none';
          reject(new Error(event.data.error));
        }
      };

      window.addEventListener('message', handleMessage);
    });
  }

  async sendTransaction(txs:TxCall[]): Promise<void> {
    if (txs.length === 0) {
      return;
    }
    const iframe = document.getElementById(this.iframeId) as HTMLIFrameElement;
    const modal = document.getElementById(this.modalId) as HTMLDivElement;
    if (!iframe || !modal) {
      return;
    }
    modal.style.display = 'flex';
    iframe?.contentWindow?.postMessage({
      type: 'KINTO_SEND_TX',
      txs,
    }, this.kintoUrl);

    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'KINTO_TX_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          resolve(event.data.hash);
          modal.style.display = 'none';
        } else if (event.data.type === 'KINTO_TX_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.error));
          modal.style.display = 'none';
        }
      };
      window.addEventListener('message', handleMessage);
    });
  }

  async createNewWallet(): Promise<void> {
    return new Promise((resolve, reject) => {
      const left = (window.screen.width / 2) - (width / 2);
      const top = (window.screen.height / 2) - (height / 2);
      
      const popup = window.open(
        `${this.kintoUrl}/onboarding?appDomain=${encodeURIComponent(window.location.origin)}`,
        'Kinto Onboarding',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        reject(new Error('Failed to open popup. Please allow popups for this site.'));
        return;
      }
      resolve();
    });
  }
}

export const createKintoSDK = (appAddress: string) => new KintoSDK(appAddress);