import { LitElement, html, css } from "lit-element";

class ExperienceCard extends LitElement {
  static get styles() {
    return css``;
  }

  render() {
    return html`<h3>ExperienceCard</h3>`;
  }

  constructor() {
    super();
  }
}

customElements.define("experience-card", ExperienceCard);
