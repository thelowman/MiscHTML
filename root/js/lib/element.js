export function createElement(tagName, settings) {
  const element = document.createElement(tagName);
  if (settings) {
    if (settings.class) {
      if (Array.isArray(settings.class)) {
        element.classList.add(...settings.class);
      }
      else {
        element.classList.add(settings.class);
      }
    }
    if (settings.style) {
      Object.assign(element.style, settings.style);
    }
    if (settings.attributes) {
      for (const [key, value] of Object.entries(settings.attributes)) {
        element.setAttribute(key, value);
      }
    }
    if (settings.children) {
      for (const child of settings.children) {
        element.appendChild(child);
      }
    }
  }
  return element;
}