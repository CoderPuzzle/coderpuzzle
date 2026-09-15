function updateMatrix(mat: number[][]): number[][] {
    const m = mat.length,
        n = mat[0].length;
    const dist: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));
    const queue: number[] = [];
    // Reverse the question: every zero broadcasts at distance 0 and the
    // first wavefront to reach a cell arrives on a shortest path.
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 0) {
                dist[i][j] = 0;
                queue.push(i * n + j);
            }
        }
    }
    let head = 0;
    while (head < queue.length) {
        const cell = queue[head++];
        const i = Math.floor(cell / n),
            j = cell % n;
        const dirs = [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ];
        for (const [di, dj] of dirs) {
            const ni = i + di,
                nj = j + dj;
            if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] === -1) {
                // An unset distance doubles as the visited check, and
                // assigning before enqueueing keeps each cell queued
                // exactly once; non-decreasing dequeue order makes the
                // first assignment final.
                dist[ni][nj] = dist[i][j] + 1;
                queue.push(ni * n + nj);
            }
        }
    }
    return dist;
}
