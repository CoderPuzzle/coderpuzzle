// Dijkstra from node 0 with one extra rule: arriving at or after a node's
// disappearance instant means it was never visited, so such a settlement
// propagates nothing onward either. Every settled distance is < 10^5 and
// every pushed candidate < 2 * 10^5, far under 2^53, so plain numbers hold
// them exactly.
function minimumTime(n: number, edges: number[][], disappear: number[]): number[] {
    const adj: number[][][] = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }
    const BIG = 1 << 29;
    const dist: number[] = new Array<number>(n).fill(BIG);
    // Min-heap of [distance, node] ordered by distance, then node
    const heap: number[][] = [];
    const less = (a: number[], b: number[]) => a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
    const push = (item: number[]) => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (!less(heap[i], heap[p])) break;
            [heap[p], heap[i]] = [heap[i], heap[p]];
            i = p;
        }
    };
    const pop = (): number[] => {
        const top = heap[0];
        const last = heap.pop() as number[];
        if (heap.length) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = l + 1;
                let s = i;
                if (l < heap.length && less(heap[l], heap[s])) s = l;
                if (r < heap.length && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                [heap[s], heap[i]] = [heap[i], heap[s]];
                i = s;
            }
        }
        return top;
    };
    dist[0] = 0;
    push([0, 0]);
    while (heap.length) {
        const [d, u] = pop();
        if (d !== dist[u]) continue; // stale entry
        if (d >= disappear[u]) continue; // gone on arrival; cannot be visited
        for (const [v, w] of adj[u]) {
            if (d + w < dist[v]) {
                dist[v] = d + w;
                push([d + w, v]);
            }
        }
    }
    const answer: number[] = new Array<number>(n);
    for (let i = 0; i < n; ++i) answer[i] = dist[i] < disappear[i] ? dist[i] : -1;
    return answer;
}
