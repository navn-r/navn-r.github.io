import { LitElement, html, css } from 'lit-element';

class WorkCard extends LitElement {
    constructor() {
        super();
        this.name = "Work";
    }

    static get styles() {
        return css`
          .work-container {
            display: flex;
            flex-direction: row;
          }

          .work-logo-container {
              display: flex;
              align-items: center;
              padding-right: 1rem;
          }

          h3 {
            color: var(--orange);
            user-select: none;
            -webkit-user-select: none;
            margin: 0;
            padding-bottom: 1rem;
          }
        `;
    }

    static get properties() {
        return {
            name: { type: String },
        };
    }

    render() {
        return html`
            <div class="work-container">
                <div class="work-logo-container">
                    <slot class="logo-img" name="work-logo-img"></slot>
                </div>
                <div class="work-info-container">
                    <h3>${this.name}</h1>
                    <slot name="work-body">Work body</slot>
                </div>
            </div>
        `;
    }
}

customElements.define("work-card", WorkCard);