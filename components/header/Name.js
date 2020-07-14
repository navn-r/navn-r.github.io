import { LitElement, html, css } from "lit-element";

class Name extends LitElement {
  static get styles() {
    return css`
      #name {
        font-size: min(20vw, 9.5rem);
        -moz-user-select: none;
        -webkit-user-select: none;
        color: var(--light-gray);
        width: max-content;
        margin: 0 auto;
        margin-top: -18rem;
        overflow: hidden;
      }

      .wiggle {
        transition: transform 0.5s ease-out;
      }

      .wiggle:hover {
        transform: rotate(20deg);
      }

      @media (max-width: 1000px) {
        #name {
          font-size: min(15vw, 6rem);
          margin-top: -9rem;
        }
      }
    `;
  }

  render() {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
        integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
        crossorigin="anonymous"
      />
      <div id="name"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi mathvariant="double-struck">N</mi><mtext>a</mtext><msub><mover accent="true"><mi>v</mi><mo>⃗</mo></mover><mi>i</mi></msub><mtext>nn</mtext></mrow><annotation encoding="application/x-tex">\mathbb{N}\textnormal{a}\vec{v}_i\textnormal{nn}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.864em;vertical-align:-0.15em;"></span><span class="mord"><span class="mord mathbb">N</span></span><span class="mord text"><span class="mord textrm">a</span></span><span class="mord"><span class="mord accent"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.714em;"><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.03588em;">v</span></span></span><span style="top:-3em;"><span class="pstrut" style="height:3em;"></span><span class="accent-body" style="left:-0.20772em;"><span class="overlay" style="height:0.714em;width:0.471em;"><svg id="arrow" width="0.471em" height="0.714em" style="width:0.471em" viewBox="0 0 471 714" preserveAspectRatio="xMinYMin"><path d="M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
      3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
      10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
      -1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
      -7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
      H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
      c-16-25.333-24-45-24-59z">
      </path></svg></span></span></span></span></span></span></span><span class="msupsub"><span class="vlist-t vlist-t2 wiggle"><span class="vlist-r"><span class="vlist" style="height:0.31166399999999994em;"><span style="top:-2.5500000000000003em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">i</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mord text"><span class="mord textrm">nn</span></span></span></span></span></div>
    `;
  }

  setParallax() {
    const scroll = window.pageYOffset;
    const name = this.shadowRoot.getElementById('name');
    const arrow = this.shadowRoot.getElementById('arrow');
    name.style.transform = `translateY(${scroll * 0.25}px)`;
    arrow.style.transform = `translateX(${scroll * 0.5}px)`;
  }

  firstUpdated() {
    window.addEventListener('scroll', this.setParallax.bind(this), true);
  }

  constructor() {
    super();
  }
}

customElements.define("app-name", Name);
