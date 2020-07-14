import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";

class ProjectCard extends LitElement {
  static get styles() {
    return [
      css`
        .card {
          width: 48rem;
          margin-top: 2rem;
          padding-bottom: 3rem;
        }

        .subtitle {
          font-size: 2rem;
          color: var(--off-white);
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        a {
          color: var(--off-white);
          transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
          text-decoration: none;
          margin-left: 1rem;
        }

        .fa-github {
          font-size: 2.25rem;
        }

        .body {
          margin-top: 2rem;
        }

        ul,
        li {
          margin-top: 0.5rem;
        }

        blockquote {
          background-color: var(--dark-light-gray);
          color: var(--off-white);
          margin: 0;
          padding: 1rem;
        }

        .code {
          font-family: var(--code);
          font-size: 1.25rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          user-select: none;
          -moz-user-select: none;
        }

        .tag {
          font-family: var(--code);
          font-size: 1rem;
          background-color: var(--light-dark-gray);
          font-weight: 600;
          padding: 0.75rem;
          margin: 0.25rem;
          border-radius: 0.5rem;
          width: max-content;
        }

        @media (max-width: 1000px) {
          .card {
            width: calc(100% - 2rem);
          }

          ul {
            padding-left: 2rem;
          }
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
      <style>
        a:hover {
          color: ${this.project.color};
        }
      </style>
      <div class="card">
        <div class="subtitle">
          ${this.project.name}
          <div class="button-container">
            <a
              href="${this.project.github}"
              aria-label="Link to GitHub Repository"
              rel="noopener noreferrer nofollow"
              target="_blank"
              ><fa-icon class="fab fa-github"></fa-icon
            ></a>
            ${this.project.demo
              ? html`<a
                  href="${this.project.demo}"
                  aria-label="Link to project demo"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  ><fa-icon class="${this.project.icon || 'fas fa-external-link-alt'}"></fa-icon
                ></a>`
              : ""}
          </div>
        </div>
        <blockquote style="border-left: 0.625rem solid ${this.project.color};">${this.project.description}</blockquote>
        <div class="body">
          <ul>
            ${this.project.features.map((f) => html`<li>${f}</li>`)}
          </ul>
          <div class="tags-container">
            ${this.project.tags.map((t) => html`<div style="color: ${this.project.color};" class="tag">${t}</div>`)}
          </div>
        </div>
      </div>
    `;
  }

  static get properties() {
    return {
      project: {
        attribute: ".project",
      },
    };
  }

  render() {
    return html`
      <div class="project-container">
        <div class="project-title-container">
          <h1>${this.name}</h1>
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
