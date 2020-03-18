// Create a class for the element
export default class Spoiler extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });

    // Create spans
    const wrapper = document.createElement("span");
    wrapper.setAttribute("class", "wrapper");

    const info = document.createElement("span");
    info.setAttribute("class", "info");

    // Take attribute content and put it inside the info span
    info.textContent = this.textContent;

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");

    style.textContent = `
      .wrapper {
        position: relative;
      }

      .info {
        background-color: green;
      }

    `;

    // Attach the created elements to the shadow dom
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(info);
  }
}

// Define the new element
customElements.define("coral-spoiler", Spoiler);
