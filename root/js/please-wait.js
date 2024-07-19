import TwoSwirls from './two-swirls.js';

const status = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  error: 'error'
};

class PleaseWait extends HTMLElement {
  status = status.idle;

  container = null;
  icon = null;
  message = null;

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        .please-wait {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .please-wait div:first-child {
          margin-right: 0.5em;
        }
      </style>
    `;
  }

  connectedCallback() {
    this.container = document.createElement('div');
    this.container.classList.add('please-wait');
    this.shadowRoot.appendChild(this.container);

    this.icon = document.createElement('div');
    this.icon.style.width = '1em';
    this.icon.style.height = '1em';
    this.container.appendChild(this.icon);

    this.message = document.createElement('div');
    this.message.innerHTML = this.innerHTML;
    this.container.appendChild(this.message);

    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        this.message.innerHTML = mutation.target.innerHTML;
      });
    });
    this.observer.observe(this, { childList: true });
  }

  static get observedAttributes() {
    return ['status'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const clearIcon = () => {
      if (this.icon.firstChild) {
        this.icon.removeChild(this.icon.firstChild);
      }
      this.icon.innerHTML = '';
    }
    if (name === 'status') {
      if (oldValue === newValue) return;
      this.status = newValue;
      switch (this.status) {
        case status.idle:
          this.icon.innerHTML = '';
          break;
        case status.pending:
          const twoSwirls = new TwoSwirls();
          twoSwirls.size = '1em';
          twoSwirls.borderDivisor = 6;
          clearIcon();
          this.icon.appendChild(twoSwirls);
          break;
        case status.success:
          clearIcon();
          this.icon.innerHTML = '&#10003;';
          break;
        case status.error:
          clearIcon();
          this.icon.innerHTML = '&#10007;';
          break;
      }
    }
  }

  

}
customElements.define('please-wait', PleaseWait);