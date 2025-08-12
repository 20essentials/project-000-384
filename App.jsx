import React from "react";
import ReactDOM from "react-dom/client";
import { css, createGlobalStyle } from "@acab/ecsstatic";

createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue';
  }
  a {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: white transparent;
  }
  body {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    overflow: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/pattern.svg');
    background-size: 50px;
    opacity: 0.3;
  }
`;

const containerLetters = css`
  width: 220px;
  height: 220px;
  position: relative;
  border-radius: 50%;
  transform: scale(0.8);
`;

const letter = css`
  position: absolute;
  background-color: transparent;
  font-weight: bold;
  text-transform: uppercase;
`;

class Letter {
  constructor(container) {
    this.letter = document.createElement("div");
    this.letter.classList.add(letter);
    container.appendChild(this.letter);
  }
  setContent(content) {
    this.letter.innerHTML = content;
  }
  setRotate(deg) {
    this.letter.style.transform = `rotate(${deg})`;
  }
  setDimension(width, height) {
    this.letter.style.width = width + "px";
    this.letter.style.height = height + "px";
    this.width = width;
    this.height = height;
  }
  setPosition(x, y) {
    this.offsetLeft = this.width / 2;
    this.offsetTop = this.height / 2;
    this.letter.style.left = x - this.offsetLeft + "px";
    this.letter.style.top = y - this.offsetTop + "px";
    this.x = x;
    this.y = y;
  }
}

class CircleLetters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        .${containerLetters} {
          position: relative;
          width: 400px;
          height: 400px;
        }
        .${letter} {
          position: absolute;
          text-align: center;
          line-height: 150px;
        }
      </style>
      <div class="${containerLetters}"></div>
    `;
  }
  connectedCallback() {
    this.drawLetters();
  }
  drawLetters() {
    const container = this.shadowRoot.querySelector(`.${containerLetters}`);
    const message = "Code is magic where ideas become reality through pure logic";
    const n_letters = message.length;
    let angle = -Math.PI;
    const increase = (Math.PI * 2) / n_letters;
    const containerLettersArray = [];
    for (let i = 0; i < n_letters; i++) {
      const letra = new Letter(container);
      letra.setDimension(40, 40);
      letra.setContent(message.charAt(i));
      containerLettersArray.push(letra);
    }
    const rotateLetter = () => {
      const rx = 10 * Math.cos(angle) + 200;
      const ry = 10 * Math.sin(angle) + 200;
      for (let i = 0; i < n_letters; i++) {
        let x = 71 * Math.cos(angle) + rx;
        let y = 71 * Math.sin(angle) + ry;
        x = contain(100, 420, x);
        y = contain(100, 420, y);
        const deg = Math.atan2(y - ry, x - rx) * (180 - Math.PI) + 90 + "deg";
        containerLettersArray[i].setRotate(deg);
        containerLettersArray[i].setPosition(x, y);
        angle += increase;
      }
      angle += 0.06;
    };
    setInterval(rotateLetter, 1000 / 30);
  }
}

function contain(min, max, value) {
  return Math.min(max, Math.max(min, value));
}

customElements.define("circle-letters", CircleLetters);

function App() {
  return <circle-letters></circle-letters>;
}

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
