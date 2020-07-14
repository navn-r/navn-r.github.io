import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  
  static get styles() {
    return css`
      #name {
        font-size: 7rem;
        padding-left: 2rem;
        color: var(--brown);
        -moz-user-select: none;
        -webkit-user-select: none;
        text-shadow: -0.15rem 0.15rem var(--tan), -0.3rem 0.3rem var(--orange),
          -0.45rem 0.45rem var(--aqua);
      }

      #btm-border {
        width: 100%;
        background-image: linear-gradient(
          180deg,
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
      }

      @media (max-width: 900px) {
        #name {
          font-size: 5rem;
          text-shadow: -0.1rem 0.1rem var(--tan), -0.2rem 0.2rem var(--orange),
            -0.3rem 0.3rem var(--aqua);
        }

        #btm-border {
          height: 2rem;
        }
      }
    `;
  }

  render() {
    return html`
      <div class="header">
        <div id="name">Navinn</div>
        <div id="btm-border"></div>
      </div>
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
     this.shadowRoot.getElementById(
       "name"
     ).innerHTML = katex.renderToString(
       "\\mathbb{N}\\textnormal{a}\\vec{v}_i\\textnormal{nn}",
       { throwOnError: false }
     );
  }
}

customElements.define("my-header", Header);
