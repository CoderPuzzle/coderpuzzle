function rotateTheBox(boxGrid: string[][]): string[][] {
    // Gravity first: in each original row stones slide right until an
    // obstacle or the wall. Then a 90-degree clockwise rotation maps
    // new[r][c] to old[m - 1 - c][r].
    const m = boxGrid.length;
    const n = boxGrid[0].length;
    const rows = boxGrid.map((row) => [...row]);
    for (let r = 0; r < m; r++) {
        let write = n - 1;
        for (let c = n - 1; c >= 0; c--) {
            if (rows[r][c] === "*") {
                write = c - 1;
            } else if (rows[r][c] === "#") {
                [rows[r][c], rows[r][write]] = [rows[r][write], rows[r][c]];
                write--;
            }
        }
    }
    const out: string[][] = Array.from({ length: n }, () => new Array(m).fill("."));
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < m; c++) {
            out[r][c] = rows[m - 1 - c][r];
        }
    }
    return out;
}
