function lastStoneWeight(stones: number[]): number {
    // The game is deterministic: only fast access to the current maximum is
    // needed, which the max-heap below provides.
    const heap = new MaxHeap(stones);
    while (heap.size() > 1) {
        // The two heaviest stones; equal ones annihilate (nothing pushed).
        const y = heap.pop();
        const x = heap.pop();
        if (x !== y) {
            heap.push(y - x);
        }
    }
    // Empty heap means every stone paired off into equal smashings.
    return heap.size() ? heap.pop() : 0;
}

class MaxHeap {
    private a: number[];
    constructor(items: number[]) {
        this.a = items.slice();
        for (let i = (this.a.length >> 1) - 1; i >= 0; i--) this.siftDown(i);
    }
    size(): number {
        return this.a.length;
    }
    push(v: number): void {
        this.a.push(v);
        let i = this.a.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (this.a[p] >= this.a[i]) break;
            [this.a[p], this.a[i]] = [this.a[i], this.a[p]];
            i = p;
        }
    }
    pop(): number {
        const top = this.a[0];
        const last = this.a.pop()!;
        if (this.a.length) {
            this.a[0] = last;
            this.siftDown(0);
        }
        return top;
    }
    private siftDown(i: number): void {
        const n = this.a.length;
        while (true) {
            const l = 2 * i + 1,
                r = l + 1;
            let m = i;
            if (l < n && this.a[l] > this.a[m]) m = l;
            if (r < n && this.a[r] > this.a[m]) m = r;
            if (m === i) break;
            [this.a[m], this.a[i]] = [this.a[i], this.a[m]];
            i = m;
        }
    }
}
