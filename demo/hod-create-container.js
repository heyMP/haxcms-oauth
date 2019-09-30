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
          font-family: "Press Start 2P", cursive;
        }
        button:hover,
        button:focus {
          cursor: pointer;
        }
        button:disabled {
          cursor: default;
          background: rgba(0,0,0, 0.8)
        }
      </style>
      ${this.store.name
        ? this.store.createContainer.state === "default"
          ? html`
              <div id="button">
                <button @click=${this.__clicked}>Create your server</button>
              </div>
            `
          : this.store.createContainer.state === "initialized"
          ? html`
              <div id="button">
                <button disabled>Initializing</button>
              </div>
            `
          : ""
        : ""}
    `;
  }

  __clicked(e) {
    this.store.createContainer.state = "initialized";
  }
}
customElements.define("hod-create-container", HodCreateContainer);
