class Progress {
  constructor(total, name) {
    this.total = total;
    this.loaded = 0;
    this.element = document.getElementById(name);
  }

  changeState(content) {
    this.element.innerText = content;
  }

  add() {
    this.loaded = this.loaded + 1;
    console.log(this.loaded);
    if(this.loaded == this.total) {
      this.element.remove();
      document.body.style.overflow = "scroll";
    }
  }
}

class P {
  constructor(innerHTML) {
    const p = document.createElement('p');
    p.innerHTML = innerHTML;
    return p;
  }
}