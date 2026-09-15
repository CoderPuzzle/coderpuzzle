function minimumEffortPath(heights: number[][]): number {
    const rows = heights.length;
    const cols = heights[0].length;
    const total = rows * cols;
    // One edge per adjacent pair (right and down neighbor), endpoints
    // flattened to r*cols + c.
    const edges: number[][] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r + 1 < rows) {
                edges.push([Math.abs(heights[r + 1][c] - heights[r][c]), r * cols + c, (r + 1) * cols + c]);
            }
            if (c + 1 < cols) {
                edges.push([Math.abs(heights[r][c + 1] - heights[r][c]), r * cols + c, r * cols + c + 1]);
            }
        }
    }
    // Ascending weight order is Kruskal's skeleton: the first edge that
    // joins the two corners is the minimum possible maximum.
    edges.sort((a, b) => a[0] - b[0]);
    const parent: number[] = new Array(total);
    const size: number[] = new Array(total).fill(1);
    for (let i = 0; i < total; i++) {
        parent[i] = i;
    }
    const find = (x: number): number => {
        // Path compression keeps later finds near O(1).
        while (parent[x] !== x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    };
    const union = (a: number, b: number): void => {
        let ra = find(a),
            rb = find(b);
        if (ra === rb) return;
        // Union by size keeps the trees shallow.
        if (size[ra] < size[rb]) [ra, rb] = [rb, ra];
        parent[rb] = ra;
        size[ra] += size[rb];
    };
    // A 1x1 grid is connected to itself from the start.
    if (find(0) === find(total - 1)) return 0;
    for (const [w, a, b] of edges) {
        if (find(a) === find(b)) continue;
        union(a, b);
        // Once both corners share a component, every path between them uses
        // some edge of weight at least w, and w already suffices.
        if (find(0) === find(total - 1)) return w;
    }
    return 0;
}
