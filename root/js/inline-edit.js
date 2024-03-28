'use strict';

/**
 * 
 */
class InlineEditInput extends HTMLInputElement {
  initialized = false;
  buttonContainer = null;
  validationContainer = null;
  initialValue = null;

  constructor() {
    super();
    this.addEventListener('focus', this.focus);
    // this.addEventListener('blur', this.blur);
  }

  connectedCallback() {
    if (!this.initialized) {
      this.initialized = true;
      this.initialValue = this.value;

      const mainContainer = document.createElement('div');
      mainContainer.style.position = 'relative';
      this.parentElement.appendChild(mainContainer);

      const myContainer = document.createElement('div');
      myContainer.appendChild(this);
      mainContainer.appendChild(myContainer);

      this.buttonContainer = document.createElement('div');
      this.buttonContainer.style.position = 'absolute';
      this.buttonContainer.style.right = '0';
      this.buttonContainer.style.top = '100%';
      this.buttonContainer.style.display = 'none';
      this.buttonContainer.style.zIndex = '1';
      this.buttonContainer.style.height = '100%';
      this.buttonContainer.style.alignItems = 'center';
      mainContainer.appendChild(this.buttonContainer);

      this.validationContainer = document.createElement('div');
      this.validationContainer.style.position = 'absolute';
      this.validationContainer.style.left = '0';
      this.validationContainer.style.top = '100%';
      this.validationContainer.style.display = 'none';
      this.validationContainer.style.zIndex = '1';
      mainContainer.appendChild(this.validationContainer);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', () => {
        this.submit();
      });
      this.buttonContainer.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', () => {
        this.reset();
      });
      this.buttonContainer.appendChild(cancelButton);
    }
  }

  focus() {
    super.focus();
    this.buttonContainer.style.display = 'flex';
  }
  blur() {
    super.blur();
    this.reset();
  }
  submit() {
    const url = this.getAttribute('data-action');
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (!data.success) {
            this.showUIError(data.message);
          }
        })
        .catch((error) => {
          console.warn('There was an error trying to communicate to the server at:', url);
          console.error('Error:', error);
          this.showUIError('Failed to communicate with the server.');
        });
    }
    else {
      console.error('No data-action attribute found');
    }
  }
  showUIError(message) {
    this.validationContainer.textContent = message;
    this.validationContainer.style.display = 'block';
  }
  reset() {
    this.value = this.initialValue;
    this.buttonContainer.style.display = 'none';
  }
}

customElements.define('inline-edit', InlineEditInput, { extends: 'input' });
export { InlineEditInput };