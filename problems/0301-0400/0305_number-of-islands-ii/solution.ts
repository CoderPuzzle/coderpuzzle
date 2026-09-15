function numIslands2(m: number, n: number, positions: number[][]): number[] {
    // Union-find over flattened cell ids r * n + c keeps the island count
    // incremental; no full grid rescan after each add-land.
    const parent: number[] = Array.from({ length: m * n }, (_, i) => i);
    const size: number[] = new Array(m * n).fill(1);
    const land: boolean[] = new Array(m * n).fill(false);
    const find = (x: number): number => {
        // Path halving: splice x onto its grandparent, flattening chains.
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    let count = 0;
    const answer: number[] = [];
    for (const [r, c] of positions) {
        const cell = r * n + c;
        // A repeated position changes nothing; re-emit the current count.
        if (land[cell]) {
            answer.push(count);
            continue;
        }
        // The new land starts as its own island before any merges.
        land[cell] = true;
        count++;
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || !land[nr * n + nc]) {
                continue;
            }
            // Distinct roots mean two islands merge, losing one count; a
            // later neighbor of the same island re-finds the merged root,
            // so no extra decrement sneaks in.
            const ra = find(cell);
            const rb = find(nr * n + nc);
            if (ra !== rb) {
                // Union by size: attach the smaller tree underneath.
                if (size[ra] < size[rb]) {
                    parent[rb] = ra;
                    size[ra] += size[rb];
                } else {
                    parent[ra] = rb;
                    size[rb] += size[ra];
                }
                count--;
            }
        }
        answer.push(count);
    }
    return answer;
}
