function findRotation(mat: number[][], target: number[][]): boolean {
    // Try each of the four orientations. Clockwise rotation:
    // new[r][c] = old[n-1-c][r].
    const n = mat.length;
    const eq = (a: number[][], b: number[][]) => a.every((row, r) => row.every((v, c) => v === b[r][c]));
    let cur = mat;
    for (let t = 0; t < 4; t++) {
        if (eq(cur, target)) {
            return true;
        }
        const nxt: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                nxt[r][c] = cur[n - 1 - c][r];
            }
        }
        cur = nxt;
    }
    return false;
}
