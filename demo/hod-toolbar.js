import { LitElement, html } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "./store.js"
import "../../web_modules/@lrnwebcomponents/hax-logo.js";

class HodToolbar extends MobxLitElement {
  constructor() {
    super();
    this.store = store
  }

  connectedCallback() {
    super.connectedCallback()
  }
  
  render() {
    return html`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        #logo {
          margin: auto;
        }
        #image {
          display: block;
          margin: auto;
          width: 80%;
          max-width: 230px;
          height: auto;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
        }
        #name {
          display: block;
          color: white;
          background: black;
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 2em 0;
          text-align: center;
          font-size: .3em;
          font-family: 'Press Start 2P', cursive;
        }
        img {
          width: 100%;
        }
      </style>
      <div id="logo">
        <hax-logo></hax-logo>
      </div>
      <div id="image">
        <img src="https://github.com/${this.store.name}.png">
        <div id="name">${this.store.name}</div>
      </div>
    `
  }
}
customElements.define("hod-toolbar", HodToolbar);
