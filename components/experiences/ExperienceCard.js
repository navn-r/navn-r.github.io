import { css, html, LitElement } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";

class ExperienceCard extends LitElement {
  static get styles() {
    return [
      css`
        .title {
          font-size: var(--subtitle);
        }

        .location {
          font-family: var(--code);
          color: var(--off-white);
          background: var(--light-dark-gray);
          padding: 0.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          outline: none;
          transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .card {
          margin: 4rem 0;
        }

        ul {
          padding-left: 2rem;
        }

        .location:hover {
          color: var(--aqua);
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
      <div class="card">
        <span class="title">${this.experience.name}</span>
        <a
          href="${this.experience.url}"
          aria-label="Link to experience"
          rel="noopener noreferrer nofollow"
          target="_blank"
          class="title location"
          >${this.experience.location}</a
        >
        <div class="body">
          ${this.experience.duration}
          <ul>
            ${this.experience.info.map((i) => html`<li>${i}</li>`)}
          </ul>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      experience: {
        attribute: ".experience",
      },
    };
  }

  constructor() {
    super();
  }
}

customElements.define("experience-card", ExperienceCard);
