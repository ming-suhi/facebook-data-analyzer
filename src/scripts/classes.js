/** Structure for managing a loading modal */
class LoadingModal {

  constructor(id, total) {
    this.element = document.getElementById(id);
    this.total = total;
    this.loaded = 0;
  }

  // Change text
  text(content) {
    this.element.innerText = content;
  }

  // Remove loading modal
  remove() {
    document.documentElement.setAttribute("state", "loaded");
    this.element.remove();
  }

  // Increment loaded, removes when total is reached
  add() {
    this.loaded = this.loaded + 1;
    if(this.loaded == this.total) this.remove();
  }
}

/** Structure for easily rendering a table */
class Table {

  constructor(labels) {

    // Create table, head, body
    this.element = document.createElement("table");
    this.thead = this.element.createTHead();
    this.tbody = this.element.createTBody();

    // Add datas to head
    for(let label of labels) {
      const element = document.createElement('th');
      element.innerHTML = label;
      this.thead.appendChild(element);
    }
  }

  
  // Add row to table
  addRow(elements) {

    // Create row
    const row = document.createElement('tr');

    // Add datas to row
    for(let element of elements) {
      row.appendChild(element);
    }

    // Append row to body
    this.tbody.appendChild(row);
  }
}