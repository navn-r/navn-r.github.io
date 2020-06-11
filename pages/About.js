import { LitElement, html, css } from "lit-element";

class About extends LitElement {
  static get styles() {
    return css`
      p {
        margin: 0;
      }

      h2 {
        margin: 1rem 0 0 0;
      }

      a {
        text-decoration: none;
        color: var(--purple);
      }

      .highlight {
        color: var(--orange);
      }

      .skills-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 1.5rem 0;
        padding-bottom: 1rem;
      }

      .skill {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .skill h4 {
        margin: 0.5rem 1rem;
      }

      .footer {
        padding-top: 1rem;
        margin-top: .25rem;
        border-top: 1px var(--orange) dashed;
      }
    `;
  }

  render() {
    return html`<p>
        Hi, I'm Navinn!
        <br /><br />
        I am a 2nd year student dev. currently
        <span style="text-decoration: line-through;">surviving</span>
        studying at the <span class="highlight">University of Toronto</span> in Canada.<br />
        You can view my notes <a href="https://navn-r.github.io/notes" target="_blank">here</a> (work in progress)<br /><br />
      </p>
      <h2 class="highlight">Skills:</h2>
      <h3 class="highlight">Programming Languages</h3>
      <div class="skills-container">
        <div class="skill"><fa-icon class="fab fa-html5" style="font-size:2rem;"></fa-icon><h4>HTML</h4></div>
        <div class="skill"><fa-icon class="fab fa-css3-alt" style="font-size:2rem;"></fa-icon><h4>CSS</h4></div>
        <div class="skill"><fa-icon class="fab fa-js-square" style="font-size:2rem;"></fa-icon><h4>JavaScript</h4></div>
        <div class="skill"><fa-icon class="fab fa-java" style="font-size:2rem;"></fa-icon><h4>Java</h4></div>
        <div class="skill"><fa-icon class="fab fa-python" style="font-size:2rem;"></fa-icon><h4>Python</h4></div>
        <div class="skill"><fa-icon class="fas fa-copyright" style="font-size:2rem;"></fa-icon><h4>C</h4></div>
      </div>
      <h3 class="highlight">Frameworks and Technologies</h3>
      <div class="skills-container">
        <div class="skill"><fa-icon class="fab fa-react" style="font-size:2rem;"></fa-icon><h4>React Native</h4></div>
        <div class="skill"><fa-icon class="fas fa-database" style="font-size:2rem;"></fa-icon><h4>Firebase</h4></div>
        <div class="skill"><fa-icon class="fab fa-git" style="font-size:2rem;"></fa-icon><h4>Git</h4></div>
        <div class="skill"><fa-icon class="fas fa-terminal" style="font-size:2rem;"></fa-icon><h4>Shell (bash)</h4></div>
        <div class="skill"><fa-icon class="fas fa-desktop" style="font-size:2rem;"></fa-icon><h4>Windows, MacOS, Linux</h4></div>
      </div> 
      <div class="footer">
          "Why waste time say lot word when few word do trick."<br /><br />
          - Kevin J. Malone<br />
      </div>`;
  }

  constructor() {
    super();
  }
}

customElements.define("about-page", About);
