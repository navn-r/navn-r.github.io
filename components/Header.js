import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  
  static get styles() {
    return css`
      .header {
        display: flex;
      }

      .header-container {
        width: 100%;
      }

      #name {
        font-size: 7rem;
        height: 10rem;
        padding-left: 5rem;
        color: var(--brown);
        -moz-user-select: none;
        -webkit-user-select: none;
        text-shadow: -0.15rem 0.15rem var(--tan), -0.3rem 0.3rem var(--orange),
          -0.45rem 0.45rem var(--aqua);
      }

      #border {
        display: flex;
        background-image:
        linear-gradient(
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
      }

      #border-swirl {
        margin-top: calc(4.25rem + 2px); /* FIX */
        margin-right: -5rem;
        height: calc(9.83rem - 2px);
        width: 10rem;
        background-image: radial-gradient(
          var(--green) 0%,
          var(--green) 1.5rem,
          var(--red) 1.5rem,
          var(--red) 2.25rem,
          var(--orange) 2.25rem,
          var(--orange) 3rem,
          var(--aqua) 3rem,
          var(--aqua) 3.75rem,
          transparent 3.75rem,
          transparent 100%
        );
      }

      @media (max-width: 900px) {
        #name {
          font-size: 5rem;
          height: 7rem;
          padding-left: 2.5rem;
          text-shadow: -0.1rem 0.1rem var(--tan), -0.2rem 0.2rem var(--orange),
            -0.3rem 0.3rem var(--aqua);
        }

        #border {
          height: 2rem;
        }

        #border-swirl {
          display: none;
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
        <div id="border-swirl"></div>
        <div class="header-container">
          <div id="name"></div>
          <div id="border"></div>
        </div>
      </div>
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    let name = this.shadowRoot.getElementById("name");
    const nameKatex = katex.renderToString(
      "\\mathbb{N}\\textnormal{a}\\vec{v}_i\\textnormal{nn}",
      { throwOnError: false }
    );
    console.log(nameKatex);
    name.innerHTML = nameKatex;
  }
}

customElements.define("main-header", Header);
