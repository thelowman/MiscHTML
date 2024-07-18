class SortableTbody extends HTMLTableSectionElement {
  constructor() {
    super();
    this.addEventListener('dragstart', this.dragstart);
    this.addEventListener('dragover', this.dragover);
    this.addEventListener('drop', this.drop);
  }

  dragstart(event) {
    event.dataTransfer.setData('text/plain', 'This text may be dragged');
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.outerHTML);
  }

  dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/html');
    const temp = document.createElement('tbody');
    temp.innerHTML = data;
    const draggedRow = temp.children[0];
    const targetRow = event.target.closest('tr');
    const targetTbody = event.target.closest('tbody');
    if (targetRow) {
      targetTbody.insertBefore(draggedRow, targetRow);
    } else {
      targetTbody.appendChild(draggedRow);
    }
  }
}