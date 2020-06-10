import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  static get styles() {
    return css`
      h1 {
        margin: 0;
        padding: 0;
      }

      .header {
        width: 90vw;
        background-color: #000;
        padding: 3em 5vw;
        border-bottom: 1.2em var(--purple-trans) ridge;
        user-select: none;
      }

      .letter {
        color: var(--orange);
      }

      .title {
        font-family: Caveat, "Oxygen Mono", monospace, serif;
        font-weight: 700;
        font-size: 4em;
        text-align: left;
        user-select: none;
        color: #ffffff;
      }

      .line-break {
        display: inline-block;
        border-left: 0.1em solid #696969;
        opacity: 0.5;
        margin: 5px 10px 5px 5px;
        height: 3.125em;
      }

      #logo {
        margin: 0.625em 0.25em;
        filter: opacity(0.5);
        animation: none;
        transition: transform 0.42s ease-in-out;
      }

      #logo:hover {
        transform: rotate(360deg);
      }

      .icon {
        width: 2.5em;
        margin: 10px;
        padding: 0 0.5em;
      }

      .icon:hover {
        animation: icon-hover 200ms forwards;
        animation-timing-function: ease-out;
      }

      @keyframes icon-hover {
        50% {
          filter: drop-shadow(0 0 0.42069em var(--purple-trans));
        }
        100% {
          filter: drop-shadow(0 0 0.42069em var(--purple));
        }
      }

      @media (max-width: 600px) {
        .title {
          font-size: 3em;
        }
      }

      @media (max-width: 450px) {
        .title {
          font-size: 2.5em;
        }

        .icon {
          width: 2em;
        }
      }
    `;
  }

  render() {
    return html` <div class="header">
      <header>
        <h1 class="title">
          <span class="letter">N</span>avinn
          <span class="letter">R</span>avindaran
        </h1>
        <img
          class="icon"
          id="logo"
          title="Est. 2020"
          src="Assets/Logo.png"
        /><span class="line-break"></span>
        <a title="Fork Me" target="_blank" href="https://github.com/navn-r/"
          ><img class="icon" src="Assets/GitHub-Mark-Light-120px-plus.png" /></a
        ><a
          title="Hire Me"
          target="_blank"
          href="https://www.linkedin.com/in/navinn-ravindaran/"
          ><img class="icon" src="Assets/LI-In-Bug.png"
        /></a>
      </header>
    </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("my-header", Header);
