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
      <project-card title="Ritrovo"></project-card>
      <project-card title="Noten"></project-card>
      <project-card title="Standup Bot"></project-card>
      <project-card title="Portfolio Website"></project-card>
    </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("projects-section", Projects);
