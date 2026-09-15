function minMoves(matrix: string[]): number {
    // BFS in layers, where each layer holds every cell reachable with d
    // moves. Teleports cost 0, so each layer first runs its full closure:
    // the first cell of a letter seen in the layer claims every unvisited
    // cell of that letter. Only then are adjacent cells moved into the
    // next layer — a same-layer teleport must beat a move claimed earlier.
    const m = matrix.length;
    const n = matrix[0].length;
    const dist = new Int32Array(m * n).fill(-1);
    const portals: number[][] = Array.from({ length: 26 }, () => []);
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const code = matrix[r].charCodeAt(c);
            if (code >= 65 && code <= 90) {
                portals[code - 65].push(r * n + c);
            }
        }
    }
    const used = new Array(26).fill(false);
    dist[0] = 0;
    let layer = [0];
    let d = 0;
    while (layer.length > 0) {
        let head = 0;
        while (head < layer.length) {
            const pos = layer[head++];
            const code = matrix[(pos / n) | 0][pos % n].charCodeAt(0);
            if (code >= 65 && code <= 90 && !used[code - 65]) {
                used[code - 65] = true;
                for (const q of portals[code - 65]) {
                    if (dist[q] === -1) {
                        dist[q] = d;
                        layer.push(q);
                    }
                }
            }
        }
        const nxt: number[] = [];
        for (const pos of layer) {
            const r = (pos / n) | 0;
            const c = pos - r * n;
            if (r > 0 && dist[pos - n] === -1 && matrix[r - 1][c] !== "#") {
                dist[pos - n] = d + 1;
                nxt.push(pos - n);
            }
            if (r + 1 < m && dist[pos + n] === -1 && matrix[r + 1][c] !== "#") {
                dist[pos + n] = d + 1;
                nxt.push(pos + n);
            }
            if (c > 0 && dist[pos - 1] === -1 && matrix[r][c - 1] !== "#") {
                dist[pos - 1] = d + 1;
                nxt.push(pos - 1);
            }
            if (c + 1 < n && dist[pos + 1] === -1 && matrix[r][c + 1] !== "#") {
                dist[pos + 1] = d + 1;
                nxt.push(pos + 1);
            }
        }
        layer = nxt;
        d++;
    }
    return dist[m * n - 1];
}
