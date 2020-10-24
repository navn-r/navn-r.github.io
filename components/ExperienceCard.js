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
        margin: 4rem  0;
      }
    `, selectionStyles];
  }

  render() {
    return html`
      <div class="card">
        <span class="title">${this.name}</span
        > <span class="title location">${this.location}</span>
        <slot name="body"></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      name: {
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
