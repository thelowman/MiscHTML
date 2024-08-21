/**
 * This is a custom element that extends the HTMLInputElement class. It adds an
 * index attribute that can be set to a number. When the Enter key is pressed,
 * the next EnterTab element in the document with the same index or the first
 * element in the document with the next highest index will be focused. If the 
 * last EnterTab element is focused, the first EnterTab element will be focused.
 * 
 * Notes:
 * - Normal Tab key behavior is not affected by this element.
 * - When an EnterTab element has the focus, Form submission is prevented.
 * - If index is not a number the order of focus is not guaranteed.
 * 
 * @example <input is="enter-tab" index="1">
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
 */
class EnterTab extends HTMLInputElement {
  index = -1;

  constructor() {
    super();
    this.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.next();
      }
    });
  }

  static get observedAttributes() {
    return ['index'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'index' && newValue) {
      this.index = parseInt(newValue);
    }
  }

  next() {
    const tabs = Array.from(document.querySelectorAll("[is=enter-tab]"))
                      .sort((a, b) => a.index - b.index);
    if (tabs.length < 2) return; // Just me here, try hitting Tab.
    const i = tabs.indexOf(this);
    if (i < 0) return; // I'm not in the list? How'd that happen?
    if (i < tabs.length - 1) tabs[i + 1].focus();
    else tabs[0].focus();
  }
}
window.customElements.define('enter-tab', EnterTab, { extends: 'input' });