import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";

class Menu extends LitElement {
  static get styles() {
    return [css`
      :host {
        grid-area: menu;
        position: sticky;
        top: 3rem;
      }

      #button-container {
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        row-gap: 1rem;
      }

      button {
        background-color: inherit;
        border: 0;
        font-size: 2rem;
        text-align: right;
        font-family: var(--main);
        outline: none;
        color: inherit;
        padding: 0;
        transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
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

      #top {
        display: none;
        border-radius: 5rem;
        background-color: var(--dark-gray);
        color: var(--light-gray);
        width: 5rem;
        height: 5rem;
        justify-content: center;
        align-items: center;
        margin: 1px;
        transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      #top:hover {
        cursor: pointer;
        color: var(--off-white);
      }

      fa-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
      }

      @media (max-width: 1000px) {
        :host {
          display: none;
        }

        #button-container {
          display: none;
        }
      }

      @media (max-width: 600px) {
        button {
          font-size: 1.875rem;
        }
      }
    `, selectionStyles];
  }

  static get properties() {
    return {
      current: String,
      offset: Object,
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
      </div>
      <div id="top" @click="${this.clickHandler}">
        <fa-icon class="fas fa-hand-point-up"></fa-icon>
      </div>
    `;
  }

  firstUpdated() {
    window.addEventListener("scroll", this.setCurrent.bind(this), true);
    const resizeObserver = new ResizeObserver(this.setOffset.bind(this));
    resizeObserver.observe(document.body);
  }

  setOffset() {
    ["experience", "projects"].forEach((target) => (this.offset[target] = document.getElementById(target).offsetTop - 15));
    this.setCurrent();
  }

  scroll(target) {
    if(target === "top") target = "about";
    scrollTo({
      top: this.offset[target],
      behavior: "smooth",
    });
  }

  setCurrent() {
    const scroll = window.pageYOffset;
    this.current = this.offset["projects"] <= scroll ? "projects" : this.offset["experience"] <= scroll ? "experience" : "about";
  }

  clickHandler(e) {
    return (this.current === e.target.id) || this.scroll(e.target.id);    
  }


  constructor() {
    super();
    this.offset = {
      about: 0,
    };
  }
}

customElements.define("app-menu", Menu);
