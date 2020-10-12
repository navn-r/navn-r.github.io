import { LitElement, html, css } from "lit-element";

class ProjectCard extends LitElement {
  static get styles() {
    return css`
      .subtitle {
        font-size: var(--subtitle);
      }

      .card {
        margin-top: 2rem;
      }
    `;
  }

  render() {
    return html` <div class="card"><span class="subtitle">${this.title}</span></div> `;
  }

  static get properties() {
    return {
      title: {
        type: String,
      },
    };
  }

  constructor() {
    super();
  }
}

customElements.define("project-card", ProjectCard);
