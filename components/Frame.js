import { LitElement, html, css } from "lit-element";

class Frame extends LitElement {
  static get styles() {
    return css`
      #frame {
        background-color: var(--beige);
        border-radius: 2rem;
        border: 1rem solid;
        border-bottom-color: var(--brown);
        border-left-color: #1b1b14;
        border-right-color: #1b1b14;
        border-top-color: #12120c;
        box-shadow: inset 0 0 3rem rgba(0, 0, 0, 0.6),
          inset 0 0 1.5rem rgba(0, 0, 0, 0.6), 0 0 1.667rem rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 2.5rem;
        width: calc(100vw - 6.945rem);
        height: calc(100vh - 6.945rem - 6rem);
        left: 2.5rem;
      }

      #frame-bottom {
        position: fixed;
        bottom: 0;
        height: 8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 2.5rem;
      }

      #rainbow-logo {
        display: flex;
        position: fixed;
        height: 4rem;
        width: 4rem;
        margin-left: 1rem;
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
        mask-size: 4rem 4rem;
        -webkit-mask-image: url("../Assets/Logo.svg");
        -webkit-mask-size: 4rem 4rem;
        box-shadow: inset 0 0 1rem #000000;
      }

      #power-light {
        right: 4rem;
        position: fixed;
        height: 1.5rem;
        width: 4rem;
        background-color: #61bc46;
        box-shadow: inset 0 0 0.5rem #000000;
        border: 2px #000000 solid;
        animation: blinking-light 4.2s ease-in-out infinite;
      }

      @keyframes blinking-light {
        50% {
          background-color: #00ff00;
        }
      }

      @media (max-width: 900px) {
        #frame {
          border: 0;
          height: 100%;
          width: 100%;
          top: 0%;
          left: 0%;
          border-radius: 0;
          box-shadow: none;
        }

        #frame-bottom {
          display: none;
        }
      }
    `;
  }
  render() {
    return html`
      <div id="frame">
        <slot name="content"></slot>
      </div>
      <div id="frame-bottom">
        <div id="rainbow-logo"></div>
        <div id="power-light"></div>
      </div>
    `;
  }
  constructor() {
    super();
  }
}

customElements.define("content-frame", Frame);
