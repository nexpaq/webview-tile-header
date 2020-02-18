// import { PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
import { LitElement, html, css } from 'lit-element';
import { getPlatform } from '@moduware/lit-utils';

/**
 * @extends HTMLElement
 */
class ModuwareWebViewTileHeader extends LitElement {
  static get is() { return 'moduware-header'; }

  static get properties() {
    return {
      title: {type: String},

      backButtonIcon: { type: String },

      platform: {
        type: String,
        reflect: true
      }
    };
  }

  constructor() {
    super();

    this.title = "Tile";
    this.platform = getPlatform();
    this.backButtonIcon = '';
  }

  static get styles() {
    return [
      css`
        :host([hidden]) {
          display: none;
        }

        :host,
        *,
        * * {
          box-sizing: border-box;
        }

        svg {
          width: auto;
        }

        :host {
          --style-font-family: Roboto, 'Roboto Regular', Helvetica, Tahoma, sans-serif;
          --style-font-size: 16px;
          --style-background-color: white;

          --ios-header-height: 44px;
          --android-header-height: 55px;
          --header-side-padding: 3vw;

          --font-size-android: 15px;
          --title-selection-line-height: 45px;

          --brand-color: #D02E3D;
          --gray-color: #606060;
          --title-selecting-border-color: #E4E4E4;
          --back-button-color: #D02E3D;

          --text-color: var(--gray-color);
          --secondary-text-color: var(--gray-color);
          --style-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          --style-shadow-android: 0 2px 4px rgba(0, 0, 0, 0.12);
        }

        :host {
          z-index: var(--header-z-index, 1);
          position: fixed;
          top: 0;
          left: 0;

          width: 100vw;
          height: var(--ios-header-height);
          padding: 0;

          font-size: var(--style-font-size);
          font-weight: normal;
          line-height: var(--ios-header-height);
          color: var(--text-color);
          font-family: var(--style-font-family);
          text-align: right;

          background-color: var(--style-background-color);
          -webkit-user-select: none;
          user-select: none;
        }

        :host([platform="ios"]:not(.nxp-no-shadow)) {
          border-color: #C8C7CC;
          border-style: solid;
          border-width: 0 0 0.5px 0;
        }

        :host([platform="android"]) {
          height: var(--android-header-height);
          padding: 0 var(--header-side-padding);
          line-height: var(--android-header-height);
          color: var(--gray-color);

          font-size: var(--font-size-android);
          font-weight: 300;
        }

        :host([platform="android"]:not(.nxp-no-shadow)) {
          box-shadow: var(--style-shadow-android);
        }

        button {
          padding: 0;
          margin: 0;
          background: none;
          border: 0;
          outline: none;
        }

        .title {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 100%;
          margin: 0;

          text-align: center;
          font-size: calc(var(--style-font-size) + 1px);
          line-height: inherit;
          text-transform: inherit;
          color: inherit;
          font-weight: 400;

          background-color: transparent;
        }

        :host([platform="android"])>h1 {
          text-align: left;
          font-size: calc(var(--font-size-android) + 5px);
          padding-left: 70px;
        }

        :host([platform="android"].nxp-back-button-hidden)>h1 {
          padding-left: 16px;
        }

        .back-button {
          padding: 0 var(--header-side-padding) !important;
          line-height: inherit;
        }

        :host(:not([platform="android"])) .nxp-button-back-android,
        :host([platform="android"]) .nxp-button-back-ios {
          display: none;
        }

        :host([platform="android"]) .back-button svg {
          margin-top: -4px;
        }

        .back-button-icon {
          display: inline-block;
        }

        .nxp-custom-back-button .nxp-button-back-android,
        .nxp-custom-back-button .nxp-button-back-ios {
          display: none;
        }

        .nxp-buttons-container {
          display: inline-block;
        }

        .nxp-buttons-container.nxp-buttons-container--disabled {
          opacity: 0.3;
          pointer-events: none;
        }

        .nxp-buttons-container>button {
          line-height: inherit;
          padding: 0 4vw !important;
          position: relative;
        }

        :host([platform="ios"]) .nxp-buttons-container>button {
          color: #D02E3D;
          font-size: 17px;
        }

        .nxp-buttons-container>button .nxp-button-number {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(15%) translateY(-85%);
          padding-right: 1px;

          display: flex;
          justify-content: center;
          align-items: center;

          height: 18px;
          min-width: 18px;
          border: 2px solid white;
          border-radius: 9px;

          background-color: #01CF9F;
          font-size: 10px;
          color: white;
          line-height: 1em;
        }

        .nxp-buttons-container>button .nxp-button-number:empty {
          display: none;
        }

        .nxp-buttons-container>button:last-child {
          padding-right: var(--header-side-padding) !important;
        }

        .back-button svg,
        .back-button img,
        .nxp-buttons-container>button>svg,
        .nxp-buttons-container>button>img {
          vertical-align: middle;
        }

        .back-button {
          float: left;
          max-width: var(--ios-header-height);
        }

        :host ::slotted([slot='right-placeholder']) {
          vertical-align: middle;
          display: inline-flex;
          color: #d12f3d;
        }

        :host([platform='ios']) ::slotted([slot='right-placeholder']) {
          padding-right: var(--header-side-padding);
        }

      .back-button svg #back-arrow {
        fill: var(--back-button-color);
      }
      `
    ];
  }

  render() {
    return html`
      <h1 class="title">${ this.title }</h1>
      <button class="back-button" @click="${this.backButtonTapHandler}">
        ${ this.backButtonIcon == '' ? this.getBackButtonIcon() : html`<img src="${this.backButtonIcon}" class="back-button-icon">` }
      </button>
      <div class="nxp-buttons-container" id="nxp-buttons-container"></div>
      <slot name="right-placeholder"></slot>
    `; // end of template html``
  } // end of render()

  /**
   * Gets either ios or android back button icons depending on platform
   */
  getBackButtonIcon() {
    if( this.platform == 'ios') {
      return html`
            <svg width="12px" height="15px" viewBox="8 35 12 15" class="back-button-icon nxp-button-back-ios">
              <path d="M10.0158703,41.9904883 C9.9622537,41.6002828 10.0847659,41.1909469 10.3798254,40.8958873 L15.8958873,35.3798254 C16.4016182,34.8740945 17.2192549,34.8717794 17.7300286,35.3825531 C18.2372659,35.8897904 18.2323789,36.7170716 17.7327562,37.2166943 L12.9476424,42.0018082 L17.7327562,46.786922 C18.2384871,47.2926529 18.2408023,48.1102896 17.7300286,48.6210633 C17.2227913,49.1283006 16.39551,49.1234135 15.8958873,48.6237909 L10.3798254,43.107729 C10.0754324,42.8033359 9.95341094,42.3859492 10.0158703,41.9904883 Z"
                id="back-arrow" stroke="none" fill="#D02E3D" fill-rule="evenodd"></path>
            </svg>
          `;
    } else {
      return html`
        <svg width="16px" height="16px" viewBox="0 0 16 16" class="back-button-icon nxp-button-back-android">
          <polygon id="back-arrow" class="nxp-svg-shape" transform="translate(-4,-4)" fill-rule="evenodd" fill="#D02E3D" points="20 11 7.8 11 13.4 5.4 12 4 4 12 12 20 13.4 18.6 7.8 13 20 13"></polygon>
        </svg>
      `;
    }
  }

  backButtonTapHandler(e) {
    this.dispatchEvent(new CustomEvent('back-button-click', {}));
  }

}

window.customElements.define(ModuwareWebViewTileHeader.is, ModuwareWebViewTileHeader);
