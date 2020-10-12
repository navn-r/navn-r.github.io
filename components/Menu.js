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
    console.log(e.target);
    if (this.current === e.target.id) return;
    this.current = e.target.id;
  }

  constructor() {
    super();
    this.current = "about";
  }
}

customElements.define("app-menu", Menu);
