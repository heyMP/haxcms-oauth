import { LitElement, html } from "../../web_modules/lit-element.js";
import { observable, action } from "../../web_modules/mobx.js";
import { MobxLitElement } from "../../web_modules/@adobe/lit-mobx.js";

const State = observable({
  name: ""
});

class HodAuth extends MobxLitElement {
  constructor() {
    super();
    this.state = observable({
      name: ""
    });
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.getAccessToken();
    await this.getUser();
  }

  async getAccessToken() {
    try {
      const access_token = await fetch(
        "http://auth.haxcms.localhost/access_token",
        {
          credentials: "include"
        }
      );
      if (access_token.status === 200) {
        window.localStorage.setItem("access_token", await access_token.json());
        return await access_token.json();
      }
    } catch (error) {}
  }

  async getUser() {
    if (typeof window.localStorage.access_token !== "undefined") {
      const access_token = window.localStorage.access_token
      const user = await fetch("http://auth.haxcms.localhost/graphql", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`
        },
        body: ' \
    { \
      "query": "query { user { name }}" \
    }'
      }).then(res => res.json());
    }
  }
}
customElements.define("hod-auth", HodAuth);
