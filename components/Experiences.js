import { LitElement, html, css } from "lit-element";

class Experiences extends LitElement {
  static get styles() {
    return css`
      #experience-container {
        border-top: 2px var(--light-gray) solid;
        margin-bottom: 2rem;
      }
    `;
  }

  render() {
    return html`
    <div id="experience-container">
        <experience-card title="Software Developer @caseware"></experience-card>
        <experience-card title="Student @uToronto"></experience-card>
    </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("experiences-section", Experiences);
