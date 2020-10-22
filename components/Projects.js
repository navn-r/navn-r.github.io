import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class Projects extends LitElement {
  static get styles() {
    return [
      css`
        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
      <span class="title">What I've made.</span>
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
