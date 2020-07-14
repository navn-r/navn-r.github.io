import { LitElement, html, css } from "lit-element";
import { selectionStyles } from "../shared/selectionStyles";
import "./ExperienceCard";

const Experiences = [
  {
    name: "Open Source Fellow",
    location: "@mlh",
    url: "https://fellowship.mlh.io",
    duration: "June 2021 - Aug. 2021",
    info: ["Coming soon"],
  },
  {
    name: "Full Stack Software Engineer Intern",
    location: "@halo",
    url: "https://www.halo.science",
    duration: "May 2021 - Aug. 2021",
    info: ["Coming soon"],
  },
  {
    name: "Software Developer Co-op",
    location: "@caseware",
    isDone: true,
    url: "https://www.caseware.com/ca",
    duration: "Sept. 2020 - Apr. 2021",
    info: [
      html`Closely collaborated in an
        <span class="highlight">Agile Scrum</span> with the
        <span class="highlight">SE</span> team`,
      html`Converted manual tests to unit tests using
        <span class="highlight">Karma, Jest and Jasmine</span>`,
      html`Developed major features and hotfixes using
        <span class="highlight">Angular and AngularJS</span>`,
    ],
  },
  {
    name: "HBSc. Computer Science (Co-op)",
    location: "@uoft",
    url: "https://www.utoronto.ca",
    duration: "Sept. 2019 - Apr. 2023 (Expected)",
    info: [
      html`cGPA: <span class="highlight">3.77</span>/4.0`,
      html`Dean's List (<span class="highlight">2019-20</span>)`,
      html`UofT Scholar (<span class="highlight">Sept 2019</span>)`,
    ],
  },
];

class ExperiencesSection extends LitElement {
  static get styles() {
    return [
      css`
        .experience-container {
          margin-bottom: 6rem;
        }

        .title {
          font-family: var(--main);
          font-size: var(--title);
          color: var(--off-white);
          margin-bottom: -2rem;
        }
      `,
      selectionStyles,
    ];
  }

  render() {
    const current = [];
    const past = [];
    Experiences.forEach((e) => (!!e.isDone ? past : current).push(e));
    return html`
      <div class="title">What I do.</div>
      <div class="experience-container">
        ${current.map(
          (e) => html` <experience-card .experience="${e}"></experience-card> `
        )}
      </div>
      <div class="title">What I've done.</div>
      <div class="experience-container">
        ${past.map(
          (e) => html` <experience-card .experience="${e}"></experience-card> `
        )}
      </div>
    `;
  }

  constructor() {
    super();
  }
}

customElements.define("experiences-section", ExperiencesSection);
