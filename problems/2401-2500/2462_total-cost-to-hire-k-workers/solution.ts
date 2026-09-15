function totalCost(costs: number[], k: number, candidates: number): number {
    const n = costs.length;
    type Pair = [number, number];
    const less = (x: Pair, y: Pair): boolean => (x[0] !== y[0] ? x[0] < y[0] : x[1] < y[1]);
    class MinHeap {
        a: Pair[] = [];
        push(v: Pair): void {
            this.a.push(v);
            let i = this.a.length - 1;
            while (i > 0) {
                const p = (i - 1) >> 1;
                if (less(this.a[i], this.a[p])) {
                    const t = this.a[i];
                    this.a[i] = this.a[p];
                    this.a[p] = t;
                    i = p;
                } else break;
            }
        }
        pop(): Pair {
            const top = this.a[0];
            const last = this.a.pop()!;
            if (this.a.length > 0) {
                this.a[0] = last;
                let i = 0;
                for (;;) {
                    const l = 2 * i + 1,
                        r = 2 * i + 2;
                    let m = i;
                    if (l < this.a.length && less(this.a[l], this.a[m])) m = l;
                    if (r < this.a.length && less(this.a[r], this.a[m])) m = r;
                    if (m === i) break;
                    const t = this.a[i];
                    this.a[i] = this.a[m];
                    this.a[m] = t;
                    i = m;
                }
            }
            return top;
        }
        peek(): Pair | undefined {
            return this.a[0];
        }
        get size(): number {
            return this.a.length;
        }
    }

    // Windows overlap => every remaining worker is always eligible, so the
    // greedy is just "hire the k cheapest overall".
    if (2 * candidates >= n) {
        const sorted = costs.slice().sort((a, b) => a - b);
        let total = 0;
        for (let i = 0; i < k; i++) total += sorted[i];
        return total;
    }
    // left = front window, right = back window; less() breaks cost ties
    // by the smaller index.
    const left = new MinHeap(),
        right = new MinHeap();
    for (let i = 0; i < candidates; i++) left.push([costs[i], i]);
    for (let i = n - candidates; i < n; i++) right.push([costs[i], i]);
    // i feeds left and j feeds right from the untouched middle; i <= j
    // guards against inserting a middle worker twice.
    let i = candidates,
        j = n - candidates - 1;
    let total = 0;
    for (let t = 0; t < k; t++) {
        // Cheaper top wins; !less(right, left) also prefers left on ties.
        if (right.size === 0 || (left.size > 0 && !less(right.peek()!, left.peek()!))) {
            const cost = left.pop()[0];
            if (i <= j) {
                left.push([costs[i], i]);
                i++;
            }
            total += cost;
        } else {
            const cost = right.pop()[0];
            if (i <= j) {
                right.push([costs[j], j]);
                j--;
            }
            total += cost;
        }
    }
    return total;
}
