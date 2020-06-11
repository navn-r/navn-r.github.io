import { LitElement, html, css, unsafeCSS } from "lit-element";

class ProjectCard extends LitElement {
  constructor() {
    super();
    this.name = "Project";
    this.codesrc = "#";
    this.demosrc = "#";
    this.hasdemo = false;
    this.hasapp = false;
  }

  static get styles() {
    const orgButton = this.hasdemo || this.hasapp ? css`1fr 1fr` : css`1fr`
    return css`
      .project-container {
        border-bottom: 1px var(--orange) dashed;
        padding: 1rem 0;
        display: grid;
        grid-template-areas:
          "icon title"
          "icon info"
          "icon text"
          "button text"
          "button text";
        grid-template-columns: 1fr 9fr;
      }

      a {
        text-decoration: none;
        color: var(--purple);
      }

      h1 {
        color: var(--orange);
        user-select: none;
        margin: 0;
        font-size: 1.75rem;
      }

      h4 {
        margin: 0 1em;
      }

      .project-title-container {
        padding-left: 1rem;
        display: grid;
        grid-area: title;
      }

      .project-text-container {
        padding-left: 1rem;
        display: grid;
        grid-area: text;
      }

      .project-info-container {
        padding-left: 1rem;
        display: grid;
        grid-area: info;
      }

      .project-img-container {
        justify-content: center;
        align-items: flex-start;
        display: grid;
        grid-area: icon;
      }

      .project-button-container {
        display: flex;
        flex-direction: column;
        grid-area: button;
      }

      .project-button a {
        display: flex;
        flex-direction: row;
        margin: 0.5rem 0;
        align-items: center;
      }

      @media (max-width: 900px) {
        .project-container {
          grid-template-areas:
            "icon title title"
            "icon info info"
            "icon button button"
            "text text text";
        }

        .project-text-container {
          padding-top: 1rem;
        }

        .project-button-container {
          flex-direction: row;
          justify-content: space-evenly;
        }

        .project-button a {
          justify-content: center;
        }
      }

      @media (max-width: 600px) {
        .project-container {
          grid-template-areas:
            "icon title"
            "icon info"
            "icon button"
            "text text";
        }
      }

      @media (max-width: 450px) {
        .project-container {
          grid-template-areas:
            "icon title"
            "icon info"
            "icon info"
            "button button"
            "text text";
        }
        h1 {
          font-size: 1.5rem;
        }
      }
      @media (max-width: 300px) {
        .project-container {
          grid-template-areas:
            "icon title"
            "icon button"
            "icon button"
            "info info"
            "text text";
        }
        .project-info-container {
          margin-top: 1rem;
        }

        .project-button-container {
          flex-direction: column;
          justify-content; center;
          margin-left: 1rem;
        }

        .project-button a {
          justify-content: left;
          align-items: center;
        }

        .project-title-container {
          align-items: flex-end;
        }

        .project-icon-container {
          padding-top: 1rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      codesrc: { type: String },
      demosrc: { type: String },
      hasdemo: { type: Boolean },
      hasapp: { type: Boolean },
    };
  }

  render() {
    return html`
      <div class="project-container">
        <div class="project-title-container">
          <h1 class="title">${this.name}</h1>
        </div>
        <div class="project-img-container">
          <slot name="project-img"></slot>
        </div>
        <div class="project-info-container">
          <slot name="info">Project Info</slot>
        </div>
        <div class="project-text-container">
          <slot name="text">Project Text</slot>
        </div>
        <div class="project-button-container">
          <div class="project-button">
            <a target="_blank" href="${this.codesrc}">
              <fa-icon
                class="fab fa-github"
                style="font-size:1.5rem;"
              ></fa-icon>
              <h4>Code</h4>
            </a>
          </div>
          ${this.hasdemo
            ? this.hasapp
              ? html`<div class="project-button">
                  <a target="_blank" href="${this.demosrc}">
                    <fa-icon
                      class="fab fa-google-play"
                      style="font-size:1.5rem;"
                    ></fa-icon>
                    <h4>Download</h4>
                  </a>
                </div>`
              : html`<div class="project-button">
                  <a href="${this.demosrc}">
                    <h4>View</h4>
                  </a>
                </div>`
            : html``}
        </div>
      </div>
    `;
  }
}

customElements.define("project-card", ProjectCard);
