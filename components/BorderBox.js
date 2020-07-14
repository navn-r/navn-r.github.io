import { LitElement, html, css } from "lit-element";

class BorderBox extends LitElement {
  static get styles() {
    return css`
      #top,
      #bottom,
      #left,
      #right {
        background: var(--tan);
        position: fixed;
      }
      #left,
      #right {
        top: 0;
        bottom: 0;
        width: 5rem;
      }

      #top,
      #bottom {
        left: 0;
        right: 0;
      }

      #left {
        left: 0;
        border-right: 1rem var(--brown) ridge;
      }
      #right {
        right: 0;
        border-left: 1rem var(--brown) groove;
      }

      #top {
        top: 0;
        height: 5rem;
        margin: 0 5rem;
        border-bottom: 1rem var(--brown) groove;
      }
      #bottom {
        bottom: 0;
        height: 12rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 5rem;
        border-top: 1rem var(--brown) ridge;
      }

      #rainbow-logo {
        display: flex;
        position: fixed;
        height: 6rem;
        width: 6rem;
        margin-left: 2rem;
        background: linear-gradient(
          180deg,
          #61bc46 0%,
          #61bc46 16%,
          #fdb827 16%,
          #fdb827 32%,
          #f4821f 32%,
          #f4821f 48%,
          #e03a3e 48%,
          #e03a3e 64%,
          #953e98 64%,
          #953e98 80%,
          #009ddc 80%,
          #009ddc 100%
        );
        mask-image: url("../Assets/Logo.svg");
        mask-size: 6rem 6rem;
        box-shadow: inset 0 0 1rem #000000;
      }

      #power-light {
        right: 7rem;
        position: fixed;
        height: 2rem;
        width: 4rem;
        background-color: #61bc46;
        box-shadow: inset 0 0 0.5rem #000000;
        border: 2px #000000 groove;
        animation: blinking-light 4.2s ease-in-out infinite;
      }

      @keyframes blinking-light {
        50% {
          background-color: #00ff00;
        }
      }

      @media (max-width: 900px) {
        #top,
        #bottom,
        #left,
        #right {
          display: none;
        }
      }
    `;
  }

  render() {
    return html`<div id="left"></div>
      <div id="right"></div>
      <div id="top"></div>
      <div id="bottom">
        <div id="rainbow-logo"></div>
        <div id="power-light"></div>
      </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("border-box", BorderBox);
