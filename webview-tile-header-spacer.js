import { PolymerElement } from './node_modules/@polymer/polymer/polymer-element.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="moduware-header-spacer">
  <template id="styles">
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
  </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/**
 * @extends HTMLElement
 */
class ModuwareWebViewTileHeaderSpacer extends PolymerElement {
  static get is() { return 'moduware-header-spacer'; }
  static get properties() {
    return {
      platform: {
        type: String,
        reflectToAttribute: true,
        value: function() {
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
    };
  }
}

customElements.define(ModuwareWebViewTileHeaderSpacer.is, ModuwareWebViewTileHeaderSpacer);
