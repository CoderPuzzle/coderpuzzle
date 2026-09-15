// Waiting inside a room is free, but a move into an adjacent room takes
// exactly one second and cannot start before the target room opens, so a
// cell settled at time t settles a neighbour at max(t, moveTime[next]) +
// 1. That relaxation never lowers a settled time, so this is
// shortest-path terrain for Dijkstra: pop cells from a min-heap of
// arrival times, skip stale entries, and the first settle of a cell is
// its final time.
function minTimeToReach(moveTime: number[][]): number {
    const n = moveTime.length;
    const m = moveTime[0].length;
    const infinity = Number.MAX_SAFE_INTEGER;
    const dist: number[][] = Array.from({ length: n }, () => new Array(m).fill(infinity));
    const heap: number[][] = []; // binary min-heap of [t, i, j]
    const push = (t: number, i: number, j: number): void => {
        heap.push([t, i, j]);
        let child = heap.length - 1;
        while (child > 0) {
            const parent = (child - 1) >> 1;
            if (heap[parent][0] <= heap[child][0]) break;
            [heap[parent], heap[child]] = [heap[child], heap[parent]];
            child = parent;
        }
    };
    const pop = (): number[] => {
        const top = heap[0];
        heap[0] = heap[heap.length - 1];
        heap.pop();
        let parent = 0;
        for (;;) {
            const left = parent * 2 + 1;
            const right = left + 1;
            let best = parent;
            if (left < heap.length && heap[left][0] < heap[best][0]) best = left;
            if (right < heap.length && heap[right][0] < heap[best][0]) best = right;
            if (best === parent) break;
            [heap[parent], heap[best]] = [heap[best], heap[parent]];
            parent = best;
        }
        return top;
    };
    dist[0][0] = 0;
    push(0, 0, 0);
    while (heap.length) {
        const [t, i, j] = pop();
        if (t > dist[i][j]) continue;
        for (const [ni, nj] of [
            [i - 1, j],
            [i + 1, j],
            [i, j - 1],
            [i, j + 1],
        ]) {
            if (ni < 0 || ni >= n || nj < 0 || nj >= m) continue;
            const nt = Math.max(t, moveTime[ni][nj]) + 1;
            if (nt < dist[ni][nj]) {
                dist[ni][nj] = nt;
                push(nt, ni, nj);
            }
        }
    }
    return dist[n - 1][m - 1];
}
