import { LitElement, html, css } from "lit-element";

class Terminal extends LitElement {
  static get styles() {
    return css`
      :host {
        /* Code Colors */
        --green: rgb(137, 202, 120);
        --blue: rgb(82, 173, 242);
        --red: rgb(239, 89, 111);
        --aqua: rgb(43, 186, 197);
        --yellow: rgb(229, 192, 123);
        --salmon: rgb(216, 152, 95);
      }

      .term {
        padding: 1rem;
        margin-bottom: 1rem;
        color: var(--off-white);
        max-width: 56rem;
        border-radius: 5px;
        user-select: none;
        -webkit-user-select: none;
        border: 0.2rem var(--dark-gray) solid;
        /* filter: drop-shadow(0.25rem 0.25rem 0.1rem black); */
      }

      .dots {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.75rem;
      }

      .dot {
        height: 0.75rem;
        width: 0.75rem;
        margin-right: 0.5rem;
        border-radius: 50%;
        display: inline-block;
      }

      #term-type {
        animation: cursor-blink 0.9s infinite;
        padding-right: 0.05rem;
        border-right: 0.1rem solid var(--off-white);
        font-family: var(--code);
      }

      @keyframes cursor-blink {
        50% {
          border-color: transparent;
        }
      }

      #min {
        background-color: rgb(255, 188, 68);
      }
      #max {
        background-color: rgb(55, 200, 79);
      }
      #exit {
        background-color: rgb(254, 86, 82);
      }
    `;
  }

  render() {
    return html`<div class="term">
      <div class="dots">
        <span class="dot" id="exit"></span>
        <span class="dot" id="min"></span>
        <span class="dot" id="max"></span>
      </div>
      <div id="term-text">
        <span id="term-type"></span>
        <div></div>
      </div>
    </div>`;
  }

  constructor() {
    super();
  }

  firstUpdated(changedproperties) {
    const texts = [
      html`<span style="color: var(--aqua);">print</span>(<span
          style="color: var(--green);"
          >"Hi, I'm Navinn!"</span
        >)`,
      html`<span style="color: var(--blue);">printf</span>(<span
          style="color: var(--green);"
          >"Hi, I'm Navinn!<span style="color: var(--red);">\\n</span>"</span
        >);`,
      html`<span style="color: var(--yellow);">console</span>.<span
          style="color: var(--blue);"
          >log</span
        >(<span style="color:var(--green);">"Hi, I'm Navinn!"</span>);`,
      html`<span style="color: var(--red);">System</span>.<span style="color: var(--red);">out</span style="color: var(--red);">.<span style="color: var(--blue);">println</span>(<span style="color: var(--green);">"Hi, I'm Navinn!"</span>);`,
      html`&lt;<span style="color: var(--red);">span</span>
        <span style="color: var(--salmon);">id</span>=<span
          style="color: var(--green);"
          >"greeting"</span
        >&gt;<span style="color: var(--off-white);">Hi, I'm Navinn!</span>&lt;/<span
          style="color: var(--red);"
          >span</span
        >&gt;`,
    ];
    const text = this.shadowRoot.getElementById("term-type");
    let textsIndex = 0;
    const type = () => {
        text.innerHTML = texts[textsIndex].strings[0]
        textsIndex = (textsIndex + 1) % 5;
        setTimeout(type, 1750);
    };
    type();
  }
}

customElements.define("typewriter-term", Terminal);
