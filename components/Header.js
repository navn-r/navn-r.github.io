import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  static get styles() {
    return css`
      .header {
        width: 100%;
        height: 18rem;
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        background-color: var(--dark-gray);
        align-items: center;
      }

      app-name {
        position: sticky;
        top: 2rem;
      }

      #logo {
        width: 5rem;
      }

      .spacer {
        flex: 1 1 auto;
      }
    `;
  }

  render() {
    return html`
      <div class="header">
        <div class="spacer"></div>
        <app-name></app-name>
        <div class="spacer"></div>
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("app-header", Header);
