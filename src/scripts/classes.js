class Progress {
  constructor(total, callback) {
    this.total = total;
    this.loaded = 0;
    this.callback = callback;
  }

  add() {
    this.loaded = this.loaded + 1;
    console.log(this.loaded);
    if(this.loaded == this.total) {
      this.callback();
    }
  }
}