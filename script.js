class Letter {
  constructor(container) {
    this.letter = document.createElement('div');
    this.letter.classList.add('letter');
    container.appendChild(this.letter);
  }

  setContent(content) {
    this.letter.innerHTML = content;
  }

  setRotate(deg) {
    this.letter.style.transform = `rotate(${deg})`;
  }

  setDimension(width, height) {
    this.letter.style.width = width + 'px';
    this.letter.style.height = height + 'px';
    this.width = width;
    this.height = height;
  }

  setPosition(x, y) {
    this.offsetLeft = this.width / 2;
    this.offsetTop = this.height / 2;
    this.letter.style.left = x - this.offsetLeft + 'px';
    this.letter.style.top = y - this.offsetTop + 'px';
    this.x = x;
    this.y = y;
  }
}

class CircleLetters extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .containerLetters {
          position: relative;
          width: 400px;
          height: 400px;
        }
        .letter {
          position: absolute;
          text-align: center;
          line-height: 150px;
        }
      </style>
      <div class="containerLetters"></div>
    `;
  }

  connectedCallback() {
    this.drawLetters();
  }

  drawLetters() {
    const container = this.shadowRoot.querySelector('.containerLetters');
    const message =
      'Code is magic where ideas become reality through pure logic';
    const n_letters = message.length;
    let angle = -Math.PI;
    const increase = (Math.PI * 2) / n_letters;
    const containerLetters = [];

    for (let i = 0; i < n_letters; i++) {
      const letra = new Letter(container);
      letra.setDimension(40, 40);
      letra.setContent(message.charAt(i));
      containerLetters.push(letra);
    }

    const rotateLetter = () => {
      const rx = 10 * Math.cos(angle) + 200;
      const ry = 10 * Math.sin(angle) + 200;

      for (let i = 0; i < n_letters; i++) {
        let x = 71 * Math.cos(angle) + rx;
        let y = 71 * Math.sin(angle) + ry;
        x = contain(100, 420, x);
        y = contain(100, 420, y);
        const deg = Math.atan2(y - ry, x - rx) * (180 - Math.PI) + 90 + 'deg';
        containerLetters[i].setRotate(deg);
        containerLetters[i].setPosition(x, y);
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

customElements.define('circle-letters', CircleLetters);
