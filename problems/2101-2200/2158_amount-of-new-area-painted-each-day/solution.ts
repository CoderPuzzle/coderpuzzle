// Canvas of "next possibly-unpainted cell" pointers: painting a cell points
// it one past itself and find() compresses the skips, so every unit of the
// painting is walked exactly once across all n days.
function amountPainted(paint: number[][]): number[] {
    const limit = 50001;
    const nxt: number[] = Array.from({ length: limit + 1 }, (_, cell) => cell);
    function find(cell: number): number {
        let root = cell;
        while (nxt[root] !== root) {
            root = nxt[root];
        }
        while (nxt[cell] !== root) {
            // path compression
            const forward = nxt[cell];
            nxt[cell] = root;
            cell = forward;
        }
        return root;
    }
    const worklog: number[] = [];
    for (const [start, end] of paint) {
        let area = 0;
        let cell = find(start);
        while (cell < end) {
            area += 1;
            nxt[cell] = cell + 1;
            cell = find(cell + 1);
        }
        worklog.push(area);
    }
    return worklog;
}
