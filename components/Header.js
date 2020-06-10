import { LitElement, html, css } from "lit-element";

class Header extends LitElement {
  static get styles() {
    return css`
      .header {
        width: 90vw;
        background-color: #000;
        padding: 3rem 5vw;
        border-bottom: 1.2rem var(--purple-trans) ridge;
        user-select: none;
        -webkit-user-select: none;
      }

      .letter {
        color: transparent;
        background: inherit;
        padding-right: 1rem;
        margin-right: -1rem;
      }

      #title {
        display: flex;
        flex-direction: row;
        font-family: Caveat, Times;
        font-weight: 700;
        font-size: 4rem;
        user-select: none;
        -webkit-user-select: none;
        color: #ffffff;
        background: linear-gradient(0deg, var(--orange) 45%, var(--yellow) 60%)
          repeat-x;
        background-size: 250% 250%;
        background-clip: text;
        -webkit-background-clip: text;
        animation: GradientAnimation 3s ease-in-out infinite;
      }

      @keyframes GradientAnimation {
        0% {
          background-position: 0% 69%;
        }
        50% {
          background-position: 100% 31%;
        }
        100% {
          background-position: 0% 69%;
        }
      }

      .line-break {
        display: inline-block;
        border-left: 0.1rem solid #696969;
        opacity: 0.5;
        margin: 5px 10px 5px 5px;
        height: 3.125rem;
      }

      #logo {
        margin: 0.625rem 0.25rem;
        filter: opacity(0.5);
        animation: none;
        transition: transform 0.42s ease-in-out;
      }

      #logo:hover {
        transform: rotate(360deg);
      }

      .icon {
        width: 2.5rem;
        margin: 10px;
        padding: 0 0.5rem;
      }

      .icon:hover {
        animation: icon-hover 200ms forwards;
        animation-timing-function: ease-out;
      }

      @keyframes icon-hover {
        50% {
          filter: drop-shadow(0 0 0.42069rem var(--purple-trans));
        }
        100% {
          filter: drop-shadow(0 0 0.42069rem var(--purple));
        }
      }

      @media (max-width: 600px) {
        #title {
          font-size: 3rem;
        }
      }

      @media (max-width: 450px) {
        #title {
          font-size: 2.5rem;
        }

        .icon {
          width: 2rem;
        }
      }
    `;
  }

  render() {
    return html` <div class="header">
      <header>
        <div id="title">
          <span class="letter">N</span>avinn&nbsp;<span class="letter">R</span>avindaran
        </div>
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
