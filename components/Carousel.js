import { LitElement, html, css } from "lit-element";

class Carousel extends LitElement {
  static get styles() {
    return css`
      fa-icon {
        font-size: 5rem;
      }
      .button {
        background: none;
        border: 0;
        cursor: pointer;
        color: var(--light-gray);
        width: 3rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .button:hover {
        color: var(--off-white);
      }

      .slide {
        width: 100%;
        background-color: var(--gray);
        justify-content: center;
        display: flex;
        justify-content: center;
      }

      .slide > img {
        height: 100%;
      }

      .carousel {
        display: grid;
        grid-template-columns: 3rem 1fr 3rem;
      }

      .track {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        width: 100%;
        justify-content: center;
      }
    `;
  }

  render() {
    return html`
      <div class="carousel">
        <button @click="${this.changeImgLeft}" class="button">
          <fa-icon class="fas fa-angle-left"></fa-icon>
        </button>
        <div class="track-container">
          <ul class="track"></ul>
        </div>
        <button @click="${this.changeImgRight}" class="button">
          <fa-icon class="fas fa-angle-right"></fa-icon>
        </button>
      </div>
    `;
  }

  static get properties() {
    return {
      name: {
        type: String,
      },
      length: {
        type: Number,
      },
      current: {
        type: Number,
      },
      width: {
          type: Number,
      }
    };
  }

  firstUpdated() {
    const track = this.shadowRoot.querySelector("ul");
    let slide = document.createElement("li");
    slide.className = "slide";

    let image = document.createElement("img");
    this.current = 1;
    image.src = `Assets/projects/${this.name}/${this.name}-1.png`;

    image.width = this.width;

    slide.appendChild(image);
    track.appendChild(slide);

  }

  changeImgRight(e) {
    let image = this.shadowRoot.querySelector("img");

    if (this.current === this.length) this.current = 1;
    else this.current++;

    image.src = `Assets/projects/${this.name}/${this.name}-${this.current}.png`;
  }

  changeImgLeft() {
    let image = this.shadowRoot.querySelector("img");

    if (this.current === 1) this.current = this.length;
    else this.current--;

    image.src = `Assets/projects/${this.name}/${this.name}-${this.current}.png`;
  }

  constructor() {
    super();
  }
}

customElements.define("image-carousel", Carousel);
