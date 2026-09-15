class Solution {
    constructor(m, n) {
        this.columns = n;
        this.total = m * n;
        this.remaining = m * n;
        this.mapping = new Map();
    }

    flip() {
        const index = Math.floor(Math.random() * this.remaining);
        const value = this.mapping.has(index) ? this.mapping.get(index) : index;
        const last = this.remaining - 1;
        const lastValue = this.mapping.has(last) ? this.mapping.get(last) : last;
        this.mapping.delete(last);
        if (index !== last) {
            this.mapping.set(index, lastValue);
        }
        this.remaining = last;
        return [Math.floor(value / this.columns), value % this.columns];
    }

    reset() {
        this.remaining = this.total;
        this.mapping.clear();
    }
}
