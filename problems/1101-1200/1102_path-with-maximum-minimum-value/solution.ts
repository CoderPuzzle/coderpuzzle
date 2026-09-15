function maximumMinimumPath(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    // Min-heap keyed on the first element (negated cell value).
    const heap: [number, number, number][] = [];
    const less = (a: [number, number, number], b: [number, number, number]) => a[0] < b[0];
    const push = (item: [number, number, number]): void => {
        heap.push(item);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (!less(heap[i], heap[parent])) {
                break;
            }
            [heap[i], heap[parent]] = [heap[parent], heap[i]];
            i = parent;
        }
    };
    const pop = (): [number, number, number] => {
        const top = heap[0];
        const last = heap.pop()!;
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            for (;;) {
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                let smallest = i;
                if (left < heap.length && less(heap[left], heap[smallest])) {
                    smallest = left;
                }
                if (right < heap.length && less(heap[right], heap[smallest])) {
                    smallest = right;
                }
                if (smallest === i) {
                    break;
                }
                [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
                i = smallest;
            }
        }
        return top;
    };

    // Best-first on the highest-valued frontier cell: taking the largest
    // candidate can never lower the running minimum, so the first arrival at
    // the goal carries the maximum bottleneck (Dijkstra with max).
    const visited: boolean[][] = Array.from({ length: rows }, () => new Array(cols).fill(false));
    visited[0][0] = true;
    push([-grid[0][0], 0, 0]);
    let best = grid[0][0];
    while (heap.length > 0) {
        const [negValue, r, c] = pop();
        // best is the bottleneck (running minimum) of the walk so far.
        best = Math.min(best, -negValue);
        if (r === rows - 1 && c === cols - 1) {
            return best;
        }
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const nr = r + dr;
            const nc = c + dc;
            // Mark visited on push so each cell enters the heap at most once.
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                visited[nr][nc] = true;
                push([-grid[nr][nc], nr, nc]);
            }
        }
    }
    return best;
}
