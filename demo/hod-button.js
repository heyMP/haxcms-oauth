import { LitElement, html } from "../../web_modules/lit-element.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";

class HodButton extends MobxLitElement {
  static get properties() {
  }

  constructor() {
    super();
  }

  render() {
    return html`
    `;
  }
}
customElements.define("hod-button", HodButton);
