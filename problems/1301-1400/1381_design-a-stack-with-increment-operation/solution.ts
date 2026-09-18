class CustomStack {
    private values: number[];
    private pending: number[];

    constructor(private maxSize: number) {
        this.values = [];
        this.pending = [];
    }

    push(x: number): void {
        if (this.values.length < this.maxSize) {
            this.values.push(x);
            this.pending.push(0);
        }
    }

    pop(): number {
        if (this.values.length === 0) {
            return -1;
        }
        const increment = this.pending.pop()!;
        if (this.pending.length > 0) {
            this.pending[this.pending.length - 1] += increment;
        }
        return this.values.pop()! + increment;
    }

    increment(k: number, val: number): void {
        const limit = Math.min(k, this.values.length);
        if (limit > 0) {
            this.pending[limit - 1] += val;
        }
    }
}
