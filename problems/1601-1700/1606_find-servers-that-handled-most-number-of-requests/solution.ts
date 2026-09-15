function busiestServers(k: number, arrival: number[], load: number[]): number[] {
    const tree = new Array(k + 1).fill(0);
    const update = (server: number, delta: number): void => {
        let i = server + 1;
        while (i <= k) {
            tree[i] += delta;
            i += i & -i;
        }
    };
    const query = (count: number): number => {
        let sum = 0;
        let i = count;
        while (i > 0) {
            sum += tree[i];
            i -= i & -i;
        }
        return sum;
    };
    const findKth = (rank: number): number => {
        let pos = 0;
        let pw = 1;
        while (pw * 2 <= k) pw *= 2;
        while (pw > 0) {
            if (pos + pw <= k && tree[pos + pw] < rank) {
                pos += pw;
                rank -= tree[pos];
            }
            pw = Math.floor(pw / 2);
        }
        return pos;
    };

    for (let server = 0; server < k; server++) update(server, 1);

    // Min-heap of [finishTime, server] pairs, ordered by finish time.
    type Pair = [number, number];
    const less = (x: Pair, y: Pair): boolean => x[0] < y[0];
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

    const n = arrival.length;
    const counts = new Array(k).fill(0);
    const heap = new MinHeap();

    for (let i = 0; i < n; i++) {
        const startTime = arrival[i];
        while (heap.size > 0 && heap.peek()![0] <= startTime) {
            const [, freed] = heap.pop();
            update(freed, 1);
        }

        const totalFree = query(k);
        if (totalFree === 0) continue;

        const start = i % k;
        const beforeStart = query(start);
        const server = beforeStart < totalFree ? findKth(beforeStart + 1) : findKth(1);

        update(server, -1);
        counts[server]++;
        heap.push([startTime + load[i], server]);
    }

    let busiest = 0;
    for (const c of counts) busiest = Math.max(busiest, c);
    const answer: number[] = [];
    for (let server = 0; server < k; server++) {
        if (counts[server] === busiest) answer.push(server);
    }
    return answer;
}
