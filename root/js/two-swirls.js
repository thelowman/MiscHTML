class TwoSwirls extends HTMLElement {
  size = '100px';
  borderDivisor = 30;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          position: relative;
        }
        .inner {
          border-color: #da5426;
          position: absolute;
          width: 80%;
          height: 80%;
          left: 10%;
          top: 10%;
          border-radius: 50%;
          border-style: solid solid solid none;
          border-top-color: transparent;
          animation: inner 0.5s linear infinite;
        }
        .outer {
          border-color: #1f2c5e;
          position: absolute;
          width: 90%;
          height: 90%;
          left: 5%;
          top: 5%;
          border-radius: 50%;
          border-style: solid solid solid none;
          border-bottom-color: transparent;
          animation: outer 0.5s linear infinite;
        }
        @keyframes inner {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }
        @keyframes outer {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
    `;
  }

  connectedCallback() {
    const swirl = document.createElement('div');
    swirl.style.width = this.size;
    swirl.style.height = this.size;
    swirl.classList.add('container');

    const inner = document.createElement('div');
    inner.classList.add('inner');
    inner.style.borderWidth = 'calc(' + this.size + ' / ' + this.borderDivisor + ')';
    swirl.appendChild(inner);
    
    const outer = document.createElement('div');
    outer.classList.add('outer');
    outer.style.borderWidth = 'calc(' + this.size + ' / ' + this.borderDivisor + ')';
    swirl.appendChild(outer);
    this.shadowRoot.appendChild(swirl);
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.shadowRoot.querySelector('.container').style.width = this.size;
      this.shadowRoot.querySelector('.container').style.height = this.size;
      this.shadowRoot.querySelector('.inner').style.borderWidth = 'calc(' + this.size + ' / ' + this.borderDivisor + ')';
      this.shadowRoot.querySelector('.outer').style.borderWidth = 'calc(' + this.size + ' / ' + this.borderDivisor + ')';
    }
  }
}
customElements.define('two-swirls', TwoSwirls);
export default TwoSwirls;
