class MinStack {
    // (value, minimum-so-far) pairs — each entry is self-contained.
    private stack: [number, number][] = [];

    constructor() {}

    push(value: number): void {
        // Snapshot the minimum of the stack as of this push: the new value
        // combined with the minimum of the entry below.
        const below = this.stack[this.stack.length - 1];
        const minimum = below === undefined ? value : Math.min(value, below[1]);
        this.stack.push([value, minimum]);
    }

    pop(): void {
        // A pop restores an earlier stack state whose exposed entry already
        // holds that state's minimum — no recomputation needed.
        this.stack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1][0];
    }

    getMin(): number {
        // The top pair alone answers both queries in O(1).
        return this.stack[this.stack.length - 1][1];
    }
}
