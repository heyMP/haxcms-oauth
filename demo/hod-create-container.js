import { LitElement, html } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";
import { store } from "./store.js";

class HodCreateContainer extends MobxLitElement {
  constructor() {
    super();
    this.store = store;
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          flex-direction: column;
          justify-content: center;
        }
        #button {
          margin: 1em auto;
          text-align: center;
        }
        button {
          display: inline-block;
          padding: 1em;
          font-size: 1.3em;
          background: black;
          color: white;
          font-family: 'Press Start 2P', cursive;
        }
        button:hover,
        button:focus {
          cursor: pointer;
        }
      </style>
      ${this.store.name
        ? html`
          <div id="button">
            <button>Create your server</button>
          </div>
          `
        : ""}
    `;
  }
}
customElements.define("hod-create-container", HodCreateContainer);
