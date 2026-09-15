class Solution {
    private columns: number;
    private total: number;
    private remaining: number;
    private mapping: Map<number, number>;

    constructor(m: number, n: number) {
        this.columns = n;
        this.total = m * n;
        this.remaining = m * n;
        this.mapping = new Map();
    }

    flip(): number[] {
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
