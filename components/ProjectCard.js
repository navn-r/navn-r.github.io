import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class ProjectCard extends LitElement {
  static get styles() {
    return [
      css`
        .subtitle {
          font-size: 2rem;
          width: 100%;
          color: var(--off-white);
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          width: 48rem;
          align-items: center;
        }

        a {
          color: var(--off-white);
          text-decoration: none;
          margin-left: 1rem;
        }

        .fa-github {
          font-size: 2.25rem;
        }

        a:hover {
          color: var(--aqua);
        }

        ::slotted(div) {
          margin-top: 2rem;
        }

        .card {
          margin-top: 2rem;
          padding-bottom: 3rem;
        }

        @media (max-width: 500px) {
          .subtitle {
            width: calc(100% - 2rem);
          }
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
      <div class="card">
        <div class="subtitle">
          ${this.name}
          <div class="button-container">
            <a href="${this.github}" target="_blank"><fa-icon class="fab fa-github"></fa-icon></a
            >${this.demo ? html`<a href="${this.demo}" target="_blank"
              ><fa-icon class="fas fa-external-link-alt"></fa-icon
            ></a>` : ""}
          </div>
        </div>
        <slot name="description"></slot>
        <slot name="body"></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      github: {
        type: String,
      },
      demo: {
        type: String,
      },
    };
  }

  constructor() {
    super();
  }
}

customElements.define("project-card", ProjectCard);
