import { LitElement, html, css } from "lit-element";

class Menu extends LitElement {
  static get styles() {
    return css`
      #button-container {
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        row-gap: 1rem;
      }

      button {
        background-color: inherit;
        border: 0;
        font-size: 2rem;
        text-align: right;
        font-family: var(--main);
        color: inherit;
      }

      .selected {
        color: var(--red);
      }

      .selected:hover {
        color: var(--red);
        cursor: initial;
      }

      button:hover {
        cursor: pointer;
        color: var(--red);
      }

      @media (max-width: 1000px) {
        #button-container {
          grid-template-rows: auto;
          grid-template-columns: repeat(4, 1fr);
        }

        button {
          text-align: center;
        }
      }

      @media (max-width: 600px) {
        button {
          font-size: 1.75rem;
        }
      }
      @media (max-width: 360px) {
        button {
          font-size: 1.5rem;
        }
      }
    `;
  }

  static get properties() {
    return {
      current: {
        type: String,
      },
    };
  }

  render() {
    return html`
      <div id="button-container">
        <button
          @click="${this.clickHandler}"
          class="${this.current === "about" ? "selected" : ""}"
          id="about"
        >
          About
        </button>
        <button
          @click="${this.clickHandler}"
          class="${this.current === "experience" ? "selected" : ""}"
          id="experience"
        >
          Experience
        </button>
        <button
          @click="${this.clickHandler}"
          class="${this.current === "projects" ? "selected" : ""}"
          id="projects"
        >
          Projects
        </button>
        <button
          @click="${this.clickHandler}"
          class="${this.current === "resume" ? "selected" : ""}"
          id="resume"
        >
          Resume
        </button>
      </div>
    `;
  }

  clickHandler(e) {
    if (this.current === e.target.id) return;
    this.current = e.target.id;
  }

  constructor() {
    super();
    this.current = "about";
  }
}

customElements.define("app-menu", Menu);
