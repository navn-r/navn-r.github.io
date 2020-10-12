import { LitElement, html, css } from "lit-element";

class Experiences extends LitElement {
  static get styles() {
    return css`
      #experience-container {
        border-top: 2px var(--light-gray) solid;
      }
    `;
  }

  render() {
    return html`
    <div id="experience-container">
        <experience-card></experience-card>
        <experience-card></experience-card>
    </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("experiences-section", Experiences);
