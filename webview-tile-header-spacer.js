import { LitElement, html } from './node_modules/lit-element/lit-element.js';

/**
 * @extends HTMLElement
 */
class ModuwareWebViewTileHeaderSpacer extends LitElement {
  render() {
    return html`
     <style>
      :host {
        --ios-header-height: 44px;
        --android-header-height: 55px;

        display: block;
      }

      :host([platform="ios"]) {
        height: var(--ios-header-height);
      }

      :host([platform="android"]) {
        height: var(--android-header-height);
      }
    </style> 
    `
  }
  static get is() { return 'moduware-header-spacer'; }
  static get properties() {
    return {
      platform: {
        type: String,
        reflect: true
      }
    };
  }

  /**
    * Instance of the element is created/upgraded. Useful for initializing
    * state, set up event listeners, create shadow dom.
    * @constructor
    */
  constructor() {
    super();
  
    this.platform = this.getPlatform();
    console.log('this.platform', this.platform);
  }

  getPlatform () {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return 'windows-phone';
    }
    if (/android/i.test(userAgent)) {
      return 'android';
    }
    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return 'ios';
    }
    return 'unknown';
  }
}

customElements.define(ModuwareWebViewTileHeaderSpacer.is, ModuwareWebViewTileHeaderSpacer);
