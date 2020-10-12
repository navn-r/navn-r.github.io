import { LitElement, html, css } from "lit-element";

class About extends LitElement {
  static get styles() {
    return css`
      #about {
        margin-bottom: 1rem;
      }

      .subtitle {
        font-size: var(--subtitle);
      }

      #logo {
        width: 5rem;
      }

      p {
        margin-top: 0;
      }

      .title {
        font-size: var(--title);
        font-family: var(--main);
      }

      .highlight {
        color: var(--off-white);
        text-decoration: none;
      }

      .link:hover {
        color: var(--aqua);
      }

      #contacts {
        display: grid;
        grid-template-columns: repeat(auto-fill, 7rem);
        row-gap: 0.5rem;

        margin-bottom: 5rem;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      .contact {
        display: flex;
        border-radius: 5rem;
        background-color: var(--dark-gray);
        color: var(--off-white);
        width: 5rem;
        height: 5rem;
        justify-content: center;
        align-items: center;
      }

      .contact:hover {
        cursor: pointer;
      }
      .contact:hover .tooltip {
        visibility: visible;
      }

      .contact .tooltip::before {
        position: absolute;
        left: calc(50% - 1rem);
        margin-top: -1.5rem;
        z-index: 1;
        height: 1rem;
        width: 1rem;
        background: var(--dark-gray);
        content: "";
        transform: translateX(50%) rotate(45deg);
      }

      .contact .tooltip {
        visibility: hidden;
        background-color: var(--dark-gray);
        color: var(--off-white);
        text-align: center;
        font-family: var(--code);
        font-size: var(--tooltip);
        position: absolute;
        z-index: 1;
        margin-top: 10rem;
        padding: 1rem;
        border-radius: 5rem;
      }

      fa-icon {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  render() {
    return html`
    <!-- <typewriter-term></typewriter-term> -->
      <div id="about">
        <span class="title highlight">Hello.</span><br /><br />
        <p>
          I am a student developer studying at the
          <a
            href="https://www.utoronto.ca/"
            target="_blank"
            class="highlight link"
            >University of Toronto</a
          >
          in Canada. <br />
          Currently, I am working as a
          <a
            href="https://www.caseware.com/ca"
            target="_blank"
            class="highlight link"
            >Software Developer at CaseWare International</a
          >
          for my co-op term. <br />
          Want to say hi? Reach out below!
        </p>
        <div id="contacts">
          <div @click="${this.clickHandler}" id="github" class="contact">
            <fa-icon class="fab fa-github" size="2rem"></fa-icon>
            <div class="tooltip">navn-r</div>
          </div>
          <div @click="${this.clickHandler}" id="linkedin" class="contact">
            <fa-icon class="fab fa-linkedin" size="2rem"></fa-icon>
            <div class="tooltip">navinn-ravindaran</div>
          </div>
          <div @click="${this.clickHandler}" id="email" class="contact">
            <fa-icon class="fas fa-paper-plane" size="2rem"></fa-icon>
            <div class="tooltip">me [at] navn [dot] me</div>
          </div>
        </div>
      </div>
    `;
  }

  clickHandler(e) {
    const links = [
      "https://github.com/navn-r",
      "https://linkedin.com/in/navinn-ravindaran",
      "mailto:me@navn.me",
    ];
    let i = e.target.id === "github" ? 0 : e.target.id === "linkedin" ? 1 : 2;
    window.open(links[i], "_blank");
  }


  constructor() {
    super();
  }
}

customElements.define("about-section", About);
