const NEIGHBOURS: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function minimumSeconds(land: string[][]): number {
    const m = land.length,
        n = land[0].length;
    const INF = m * n + 1;
    let sr = 0,
        sc = 0,
        dr = 0,
        dc = 0;
    // Water BFS: arrival time of every empty cell. Only '.' floods, so
    // 'S', 'D' and 'X' stay dry (the statement guarantees it for 'D').
    const flood: number[][] = Array.from({ length: m }, () => new Array(n).fill(INF));
    const water: [number, number][] = [];
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (land[r][c] === "*") {
                flood[r][c] = 0;
                water.push([r, c]);
            } else if (land[r][c] === "S") {
                sr = r;
                sc = c;
            } else if (land[r][c] === "D") {
                dr = r;
                dc = c;
            }
        }
    }
    let head = 0;
    while (head < water.length) {
        const [r, c] = water[head++];
        const step = flood[r][c] + 1;
        for (const [drr, dcc] of NEIGHBOURS) {
            const nr = r + drr,
                nc = c + dcc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (land[nr][nc] !== "." || flood[nr][nc] !== INF) continue;
            flood[nr][nc] = step;
            water.push([nr, nc]);
        }
    }
    // Person BFS: enter '.'/'D' strictly before the water does; the
    // same-second landing ban is the strict '<'.
    const seen: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    seen[sr][sc] = true;
    const queue: [number, number, number][] = [[sr, sc, 0]];
    head = 0;
    while (head < queue.length) {
        const [r, c, t] = queue[head++];
        if (r === dr && c === dc) return t;
        for (const [drr, dcc] of NEIGHBOURS) {
            const nr = r + drr,
                nc = c + dcc;
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
            if (seen[nr][nc]) continue;
            if ((land[nr][nc] !== "." && land[nr][nc] !== "D") || t + 1 >= flood[nr][nc]) {
                continue;
            }
            seen[nr][nc] = true;
            queue.push([nr, nc, t + 1]);
        }
    }
    return -1;
}
