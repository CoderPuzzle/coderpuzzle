class CustomStack {
    constructor(maxSize) {
        this.values = [];
        this.pending = [];
        this.maxSize = maxSize;
    }

    push(x) {
        if (this.values.length < this.maxSize) {
            this.values.push(x);
            this.pending.push(0);
        }
    }

    pop() {
        if (this.values.length === 0) {
            return -1;
        }
        const increment = this.pending.pop();
        if (this.pending.length > 0) {
            this.pending[this.pending.length - 1] += increment;
        }
        return this.values.pop() + increment;
    }

    increment(k, val) {
        const limit = Math.min(k, this.values.length);
        if (limit > 0) {
            this.pending[limit - 1] += val;
        }
    }
}
