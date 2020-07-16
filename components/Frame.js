import { LitElement, html, css } from "lit-element";

class Frame extends LitElement {
  static get styles() {
    return css`
      #outer-frame-wrapper {
        background: var(--tan);
        background-image: linear-gradient(#cdcd91, #d7d28c);
        position: absolute;
        padding: 1.5rem;
        top: 1.875rem;
        left: 1.875rem;
        border-radius: 0.75rem;
      }

      #inner-frame-wrapper {
        border-radius: 0.75rem;
        padding: 1.5rem;
        padding-bottom: 2.25rem;
        background: var(--tan);
        background-image: linear-gradient(#898961, #e6e6aa);
        /* background-image: conic-gradient(
          #898961 12.5%,
          #b6b681 15.5% 33%,
          var(--tan) 34% 65.5%,
          #cdcd91 66.5% 83.5%,
          #898961 86.5%
          ); */
      }

      #frame {
        background-image: radial-gradient(
          ellipse at center,
          rgba(41, 54, 60, 1) 0%,
          var(--gray) 100%
        );
        border-radius: 6rem / 3rem;
        border: 0.1875rem solid;
        border-bottom-color: var(--brown);
        border-left-color: #1b1b14;
        border-right-color: #1b1b14;
        border-top-color: #12120c;
        box-shadow: 0 0 15px 7.5px #000000 inset;
        width: calc(100vw - 10.042rem);
        height: calc(100vh - 18.75rem);
      }

      #frame-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-top: 3.75rem;
      }

      #logo-inset {
        display: flex;
        height: 3rem;
        width: 3rem;
        box-shadow: 0 0 2.25px 0 var(--brown) inset;
        border-left: 1.5px var(--brown) solid;
        border-top: 1.5px var(--brown) solid;
        padding: 0.375rem;
        background: var(--tan);
      }

      #rainbow-logo {
        display: flex;
        height: 3rem;
        width: 3rem;
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
        mask-size: 3rem 3rem;
        -webkit-mask-image: url("../Assets/Logo.svg");
        -webkit-mask-size: 3rem 3rem;
        box-shadow: inset 0 0 0.75rem #000000;
      }

      #power-light {
        height: 1.125rem;
        width: 3rem;
        background-color: #61bc46;
        box-shadow: inset 0 0 0.375rem #000000;
        border: 1.5px #000000 solid;
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
          top: 0%;
          left: 0%;
          height: 100%;
          width: 100%;
          border-radius: 0;
          box-shadow: none;
          background: var(--gray);
          margin: 0;
          padding: 0;
        }
        #frame-bottom {
          display: none;
          background: none;
        }
        #outer-frame-wrapper {
          border: 0;
          padding: 0;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: none;
          border: 0;
          border-radius: 0;
        }
        #inner-frame-wrapper {
          border: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background: none;
        }
      }
    `;
  }
  render() {
    return html`
      <div id="outer-frame-wrapper">
        <div id="inner-frame-wrapper">
          <div id="frame">
            <slot name="content"></slot>
          </div>
        </div>
        <div id="frame-bottom">
          <div id="logo-inset">
            <div id="rainbow-logo"></div>
          </div>
          <div id="power-light"></div>
        </div>
      </div>
    `;
  }
  constructor() {
    super();
  }
}

customElements.define("content-frame", Frame);
