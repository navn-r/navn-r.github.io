import { LitElement, html } from "lit-element";

export class FaIcon extends LitElement {
  static get properties() {
    return {
      class: { type: String },
      style: { type: String },
    };
  }
  constructor() {
    super();
    this.class = "";
    this.style = "";
  }

  render() {
    return html`<link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@master/devicon.min.css"
      />
      <i class="${this.class} icon" style="${this.style}"></i>`;
  }
}
customElements.define("fa-icon", FaIcon);
