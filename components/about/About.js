import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";

const Contacts = [
  {
    id: "github",
    href: "https://github.com/navn-r",
    icon: "fab fa-github",
    tooltip: "navn-r",
  },
  {
    id: "linkedin",
    href: "https://linkedin.com/in/navn-r",
    icon: "fab fa-linkedin",
    tooltip: "/in/navn-r",
  },
  {
    id: "email",
    href: "mailto:me@navn.me",
    icon: "fas fa-paper-plane",
    tooltip: "me [at] navn [dot] me",
  },
  {
    id: "resume",
    href: "./resume",
    icon: "fas fa-file-pdf",
    tooltip: "resume [dot] pdf",
  },
];

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
          padding-right: 2rem;
        }

        .title {
          font-size: var(--title);
          font-family: var(--main);
        }

        .link {
          transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
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
          background-color: var(--light-dark-gray);
          color: var(--light-gray);
          width: 5rem;
          height: 5rem;
          justify-content: center;
          align-items: center;
          margin: 1px;
          transition: color 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .contact:hover {
          cursor: pointer;
          color: var(--off-white);
        }
        .contact:hover .tooltip {
          visibility: visible;
          transition: visibility 0.375s cubic-bezier(0.075, 0.82, 0.165, 1);
        }

        .contact .tooltip::before {
          position: absolute;
          left: calc(50% - 1rem);
          margin-top: -1.5rem;
          z-index: 1;
          height: 1rem;
          width: 1rem;
          background: var(--light-dark-gray);
          content: "";
          transform: translateX(50%) rotate(45deg) translateZ(5rem);
        }

        .contact .tooltip {
          visibility: hidden;
          background-color: var(--light-dark-gray);
          color: var(--off-white);
          text-align: center;
          font-family: var(--code);
          font-size: var(--tooltip);
          font-weight: 500;
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
      `,
      selectionStyles,
    ];
  }

  a(href, content) {
    return html`<a
      href="${href}"
      rel="noopener noreferrer nofollow"
      target="_blank"
      class="highlight link"
      >${content}</a
    >`;
  }

  render() {
    return html`
      <div id="about">
        <span class="title highlight">Hello.</span><br /><br />
        <p>
          I am a student developer studying Computer Science & Statistics at the
          ${this.a("https://www.utoronto.ca/", "University of Toronto")} in
          Canada.<br />You can view my course notes
          ${this.a("./notes", "here")}. Currently, I am working as a
          ${this.a(
            "https://halo.science",
            "Full Stack Engineer at Halo Science"
          )}
          <br />
          for my Summer 2021 Internship. Let's connect. Reach out below! <br />
        </p>
        <div id="contacts">
          ${Contacts.map(
            ({ id, href, icon, tooltip }) => html`<a
              href="${href}"
              rel="noopener noreferrer nofollow"
              target="_blank"
              class="contact"
              aria-label="Link to ${id}"
            >
              <fa-icon class="${icon}"></fa-icon>
              <div class="tooltip">${tooltip}</div>
            </a>`
          )}
        </div>
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("about-section", About);
