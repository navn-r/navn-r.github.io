import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class ExperienceCard extends LitElement {
  static get styles() {
    return [css`
      .title {
        font-size: var(--subtitle);
      }

      .location {
        font-family: var(--code);
        background: var(--dark-gray);
        padding: 0.25rem;
      }

      .card {
        margin-top: 2rem;
      }
    `, selectionStyles];
  }

  render() {
    return html`
      <div class="card">
        <span class="title">${this.title}</span
        > <span class="title location">${this.location}</span>
      </div>
    `;
  }

  static get properties() {
    return {
      title: {
        type: String,
      },

      location: {
        type: String,
      }
    };
  }

  constructor() {
    super();
  }
}

customElements.define("experience-card", ExperienceCard);
