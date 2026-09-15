function maxPoints(grid: number[][], queries: number[]): number[] {
    const m = grid.length,
        n = grid[0].length;
    const qlen = queries.length;
    // A query q scores exactly the cells reachable from (0,0) through values
    // < q; that set only grows with q, so answer queries in ascending order
    // against one shared frontier instead of running a BFS per query.
    const order = Array.from({ length: qlen }, (_, i) => i);
    order.sort((a, b) => queries[a] - queries[b]);
    const answer = new Array<number>(qlen).fill(0);
    const visited: boolean[][] = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
    visited[0][0] = true;

    // Min-heap of [val, r, c]. The start cell is marked visited up front so
    // it must be earned by the pop loop like any other cell.
    type Cell = [number, number, number];
    const heap: Cell[] = [[grid[0][0], 0, 0]];
    const less = (x: Cell, y: Cell): boolean =>
        x[0] !== y[0] ? x[0] < y[0] : x[1] !== y[1] ? x[1] < y[1] : x[2] < y[2];
    const push = (v: Cell): void => {
        heap.push(v);
        let i = heap.length - 1;
        while (i > 0) {
            const p = (i - 1) >> 1;
            if (less(heap[i], heap[p])) {
                const t = heap[i];
                heap[i] = heap[p];
                heap[p] = t;
                i = p;
            } else break;
        }
    };
    const pop = (): Cell => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const l = 2 * i + 1,
                    r = 2 * i + 2;
                let s = i;
                if (l < heap.length && less(heap[l], heap[s])) s = l;
                if (r < heap.length && less(heap[r], heap[s])) s = r;
                if (s === i) break;
                const t = heap[i];
                heap[i] = heap[s];
                heap[s] = t;
                i = s;
            }
        }
        return top;
    };

    let count = 0;
    for (const idx of order) {
        const q = queries[idx];
        // Pop while the cheapest frontier cell is strictly below q: this is
        // Dijkstra-like expansion in value order, one point per popped cell.
        while (heap.length > 0 && heap[0][0] < q) {
            const [, r, c] = pop();
            count += 1;
            const nb: Cell[] = [
                [r + 1, c, 0],
                [r - 1, c, 0],
                [r, c + 1, 0],
                [r, c - 1, 0],
            ];
            for (const t of nb) {
                const nr = t[0],
                    nc = t[1];
                if (0 <= nr && nr < m && 0 <= nc && nc < n && !visited[nr][nc]) {
                    // Mark at push time: no duplicate entries, so each cell
                    // enters and leaves the heap exactly once overall.
                    visited[nr][nc] = true;
                    push([grid[nr][nc], nr, nc]);
                }
            }
        }
        // Heap min >= q (or empty): nothing further is reachable for this or
        // any smaller remaining query, so the running count answers it.
        answer[idx] = count;
    }
    return answer;
}
