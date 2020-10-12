import { LitElement, html, css } from "lit-element";

class ProjectCard extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`<h3>ProjectCard</h3>`;
  }

  constructor() {
    super();
  }
}

customElements.define("project-card", ProjectCard);
