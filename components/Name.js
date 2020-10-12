import { LitElement, html, css } from "lit-element";

class Name extends LitElement {
  static get styles() {
    return css`
      #name {
        font-size: min(20vw, 8.5rem);
        -moz-user-select: none;
        -webkit-user-select: none;
        color: var(--light-gray);
        text-align: center;
      }
    `;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossorigin="anonymous"
      />
      <div id="name"></div>
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const nameKatex = katex.renderToString(
      "\\mathbb{N}\\textnormal{a}\\vec{v}_i\\textnormal{nn}",
      { throwOnError: false }
    );
    this.shadowRoot.getElementById("name").innerHTML += nameKatex;
  }
}

customElements.define("app-name", Name);
