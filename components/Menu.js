import { LitElement, html, css } from "lit-element";

class Menu extends LitElement {
  constructor() {
    super();
    this.current = 'about';
    document.getElementById(this.current).style.display = "block";
  }

  static get styles() {
    return css`
      p {
        font-family: Caveat, sans-serif, times;
        font-size: 2rem;
        color: var(--purple);
        margin: 0;
        user-select: none;
      }

      .open {
        animation: none;
        color: var(--orange);
        filter: drop-shadow(0.25rem 0.25rem 0.1rem black);
      }

      p:hover {
        animation: menu-hover 200ms forwards;
      }

      @keyframes menu-hover {
        100% {
          color: var(--orange);
          filter: drop-shadow(0.25rem 0.25rem 0.1rem black);
        }
      }

      .menu-container {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        padding-left: 5vw;
      }

      @media (max-width: 600px) {
        .menu-container {
          grid-template-rows: none;
          grid-template-columns: 1fr 1fr 1fr;
          grid-column-gap: 15%;
          padding: 0 10vw;
          width: 80vw;
        }
      }

      @media (max-width: 450px) {
        p {
          font-size: 1.5rem;
        }
      }
    `;
  }

  static get properties() {
    return {
        current: {
            type: String
        }
    }
  }

  onPressHandler(e) {
    this.current = e.target.id;
    const content = document.getElementsByClassName("content");
    for(let i = 0; i < content.length; i++) {
      content[i].style.display = "none";
    }
    const currentContent = document.getElementById(e.target.id);
    currentContent.style.display = "block";
  }

  render() {
    return html` <div class="menu-container">
      <p
        @click="${this.onPressHandler}"
        class="${this.current === "about" ? "open" : ""}"
        id="about"
      >
        About
      </p>
      <p
        @click="${this.onPressHandler}"
        class="${this.current === "projects" ? "open" : ""}"
        id="projects"
      >
        Projects
      </p>
      <p
        @click="${this.onPressHandler}"
        class="${this.current === "resume" ? "open" : ""}"
        id="resume"
      >
        Resume
      </p>
      
    </div>`;
  }
}

customElements.define("nav-menu", Menu);
