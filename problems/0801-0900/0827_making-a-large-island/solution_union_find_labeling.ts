function largestIsland(grid: number[][]): number {
    const n = grid.length;
    const cells = n * n;
    // Disjoint-set forest over the cells: parent[i*n+j] points at the
    // cell's current representative, and size is maintained per
    // representative only. Union by size plus path compression keeps
    // the trees nearly flat.
    const parent: number[] = [];
    const size: number[] = [];
    for (let idx = 0; idx < cells; idx++) {
        parent.push(idx);
        size.push(1);
    }

    const find = (x: number): number => {
        let root = x;
        while (parent[root] !== root) {
            root = parent[root];
        }
        while (parent[x] !== root) {
            const next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    };

    const unite = (a: number, b: number): void => {
        a = find(a);
        b = find(b);
        if (a === b) {
            return;
        }
        if (size[a] < size[b]) {
            const t = a;
            a = b;
            b = t;
        }
        parent[b] = a;
        size[a] += size[b];
    };

    // One row-major pass: each 1-cell joins the (already processed)
    // 1-cell to its left and the one above, so every island is
    // assembled edge by edge and no traversal stack is needed.
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                const idx = i * n + j;
                if (j > 0 && grid[i][j - 1] === 1) {
                    unite(idx, idx - 1);
                }
                if (i > 0 && grid[i - 1][j] === 1) {
                    unite(idx, idx - n);
                }
            }
        }
    }

    // Best starts at the largest existing island — also the answer
    // when the grid is all 1s and no 0 exists to flip.
    let best = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                const s = size[find(i * n + j)];
                if (s > best) {
                    best = s;
                }
            }
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 0) {
                // Dedup matters: one island can touch this 0 on
                // several sides, and counting it twice would
                // overstate the merge. The dedup key is the root.
                const seen = new Set<number>();
                const dirs: Array<[number, number]> = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ];
                for (const [di, dj] of dirs) {
                    const ni = i + di;
                    const nj = j + dj;
                    if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] === 1) {
                        seen.add(find(ni * n + nj));
                    }
                }
                // Flipping this 0 merges it with the distinct
                // neighboring islands.
                let total = 1;
                for (const root of seen) {
                    total += size[root];
                }
                if (total > best) {
                    best = total;
                }
            }
        }
    }
    return best;
}
