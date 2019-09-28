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

    // window.location = `http://auth.haxcms.localhost/login?redirect=${window.location}`
    const access_token = await fetch('http://auth.haxcms.localhost/access_token', {
      credentials: 'include'
    }).then(res => res.json())
    if (access_token) {
      window.localStorage.setItem('access_token', access_token)
      const user = await fetch('http://auth.haxcms.localhost/graphql', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication': `Bearer ${access_token}`
        },
        body:
          ' \
      { \
        "query": "query { users { name }}" \
      }'
      }).then(res => res.json())

      console.log(user)
    }
  }

}
customElements.define("hod-auth", HodAuth);
