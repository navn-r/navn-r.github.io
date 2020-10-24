import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "./selectionStyles";

class About extends LitElement {
  static get styles() {
    return [
      css`
        #about {
          margin-bottom: 1rem;
        }

        .subtitle {
          font-size: var(--subtitle);
        }

        p {
          margin-top: 0;
        }

        .title {
          font-size: var(--title);
          font-family: var(--main);
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
          outline: none;
        }

        .contact {
          display: flex;
          border-radius: 5rem;
          background-color: var(--dark-gray);
          color: var(--light-gray);
          width: 5rem;
          height: 5rem;
          justify-content: center;
          align-items: center;
          margin: 1px;
        }

        .contact:hover {
          cursor: pointer;
          color: var(--off-white);
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
          transform: translateX(50%) rotate(45deg) translateZ(5rem);
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
          padding: 1rem;
          border-radius: 5rem;
          transform: translateY(5rem);
        }

        fa-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
        }

        figure {
          width: 70rem;
          margin: 0;
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    return html`
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
          Let's connect. Reach out below! <br />
          <span
            style="font-family: var(--code); color: var(--green); font-size: 1.25rem;"
            >under construction and new management</span
          >
        </p>
        <div id="contacts">
          <a
            id="github"
            href="https://github.com/navn-r"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fab fa-github"></fa-icon>
            <div class="tooltip">navn-r</div>
          </a>
          <a
            id="linkedin"
            href="https://linkedin.com/in/navinn-ravindaran"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fab fa-linkedin"></fa-icon>
            <div class="tooltip">navinn-ravindaran</div>
          </a>
          <a
            id="email"
            href="mailto:me@navn.me"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fas fa-paper-plane"></fa-icon>
            <div class="tooltip">me [at] navn [dot] me</div>
          </a>
          <a
            id="resume"
            href="https://utsc-utoronto-csm.symplicity.com/qr/4db0a409d04be0eebe62b63e9d0e1e4f?resume=73d14a30f47b13ade479e1689e2fd6ae&student=46b91eed6f460f44229377b0f6ec2264"
            target="_blank"
            class="contact"
          >
            <fa-icon class="fas fa-file-pdf"></fa-icon>
            <div class="tooltip">resume [dot] pdf</div>
          </a>
        </div>
        <!-- <typewriter-term></typewriter-term> -->
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("about-section", About);
