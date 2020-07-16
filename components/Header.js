import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  
  static get styles() {
    return css`

      .header {
        margin: 1rem 0;
      }

      #name {
        font-size: 5.5rem;
        -moz-user-select: none;
        -webkit-user-select: none;
        color: var(--light-gray);
      }

      /* #border {
        display: flex;
        background-image: linear-gradient(
          var(--green) 0%,
          var(--green) 25%,
          var(--red) 25%,
          var(--red) 50%,
          var(--orange) 50%,
          var(--orange) 75%,
          var(--aqua) 75%,
          var(--aqua) 100%
        );
        height: 3rem;
        width: 100%;
      } */

      /* #border-swirl {
        margin-top: 4.35rem;
        margin-right: -5rem;
        height: 9.83rem;
        width: 10rem;
        flex-shrink: 0;
        background-image: radial-gradient(
          rgba(0, 0, 0, 0) 0%,
          rgba(0, 0, 0, 0) 0.75rem,
          var(--green) 0.75rem,
          var(--green) 1.5rem,
          var(--red) 1.5rem,
          var(--red) 2.25rem,
          var(--orange) 2.25rem,
          var(--orange) 3rem,
          var(--aqua) 3rem,
          var(--aqua) 3.75rem,
          rgba(0, 0, 0, 0) 3.75rem,
          rgba(0, 0, 0, 0) 100%
        );
      } */
      @media (max-width: 300px) {
        #name {
          font-size: 3.5rem;
        }
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
      <div class="header">
          <div id="name"></div>
      </div>
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
    this.shadowRoot.getElementById("name").innerHTML = nameKatex;
  }
}

customElements.define("main-header", Header);
