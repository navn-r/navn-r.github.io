import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  static get styles() {
    return css`
      #header {
        width: 100%;
        height: 18rem;
        background-color: var(--dark-gray);
        user-select: none;
        -moz-user-select: none;
      }

      app-name {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: -18rem;
      }

      @media (max-width: 1000px) {
        #header {
          height: 10rem;
        }

        app-name {
          margin-top: -10rem;
        }
      }
    `;
  }

  render() {
    return html`
      <div id="header">
        <slot name="particles"></slot>
        <app-name></app-name>
      </div>
    `;
  }

  firstUpdated() {
    particlesJS.load("particles", "Assets/particles.json", function () {
      console.log("callback - particles.js config loaded");
    });

  }

  constructor() {
    super();
  }
}

customElements.define("app-header", Header);
