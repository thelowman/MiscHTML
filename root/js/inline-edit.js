'use strict';

/**
 * 
 */
class InlineEditInput extends HTMLInputElement {
  initialized = false;
  buttonContainer = null;
  initialValue = null;

  constructor() {
    super();
    this.addEventListener('focus', this.focus);
    this.addEventListener('blur', this.blur);
  }

  connectedCallback() {
    if (!this.initialized) {
      this.initialized = true;
      this.initialValue = this.value;

      const mainContainer = document.createElement('div');
      mainContainer.style.position = 'relative';
      mainContainer.style.display = 'flex';
      this.parentElement.appendChild(mainContainer);

      const myContainer = document.createElement('div');
      myContainer.appendChild(this);
      mainContainer.appendChild(myContainer);

      this.buttonContainer = document.createElement('div');
      // this.buttonContainer.style.position = 'absolute';
      this.buttonContainer.style.right = '0';
      this.buttonContainer.style.top = '0';
      this.buttonContainer.style.flexGrow = '1';
      this.buttonContainer.style.display = 'none';
      this.buttonContainer.style.zIndex = '1';
      mainContainer.appendChild(this.buttonContainer);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.addEventListener('click', () => {
        alert('Save button clicked');
      });
      this.buttonContainer.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.addEventListener('click', () => {
        alert('Cancel button clicked');
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
    this.buttonContainer.style.display = 'none';
  }
  reset() {
    this.value = this.initialValue;
  }
}

customElements.define('inline-edit', InlineEditInput, { extends: 'input' });
export { InlineEditInput };