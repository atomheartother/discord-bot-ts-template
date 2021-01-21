class Backup {
    mode: string;

    inc: number;

    startValue: number;

    maxValue: number;

    val: number;

    constructor({
      mode = 'exponential',
      inc = 2,
      startValue = 0,
      maxValue = 0,
    } = {}) {
      this.mode = mode;
      this.inc = inc;
      this.startValue = startValue;
      this.maxValue = maxValue;
      this.val = startValue;
    }

    reset() : void {
      this.val = this.startValue;
    }

    set(val: number) : void {
      this.val = val;
    }

    increment() : void {
      switch (this.mode) {
        case 'linear':
          this.val += this.inc;
          break;
        default:
          this.val *= this.inc;
      }
      if (this.maxValue > 0 && this.val > this.maxValue) {
        this.val = this.maxValue;
      }
    }

    value() : number {
      return this.val;
    }
}

export default Backup;
