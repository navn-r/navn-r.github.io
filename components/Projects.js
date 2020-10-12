import { LitElement, html, css } from "lit-element";

class Projects extends LitElement {
  static get styles() {
    return css`
      #projects-container {
        border-top: 2px var(--light-gray) solid;
      }
    `;
  }

  render() {
    return html`
    <div id="projects-container">
      <project-card></project-card>
      <project-card></project-card>
      <project-card></project-card>
      <project-card></project-card>
    </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("projects-section", Projects);
