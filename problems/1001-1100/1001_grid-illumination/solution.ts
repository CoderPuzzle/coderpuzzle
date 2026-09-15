function gridIllumination(n: number, lamps: number[][], queries: number[][]): boolean[] {
    const row = new Map<number, number>();
    const col = new Map<number, number>();
    const diag = new Map<number, number>();
    const antiDiag = new Map<number, number>();
    const on = new Set<string>();
    const bump = (map: Map<number, number>, key: number, delta: number) => map.set(key, (map.get(key) || 0) + delta);

    for (const [x, y] of lamps) {
        const key = `${x},${y}`;
        if (on.has(key)) {
            continue;
        }
        on.add(key);
        bump(row, x, 1);
        bump(col, y, 1);
        bump(diag, x - y, 1);
        bump(antiDiag, x + y, 1);
    }

    const ans: boolean[] = [];
    for (const [x, y] of queries) {
        ans.push(
            (row.get(x) || 0) > 0 ||
                (col.get(y) || 0) > 0 ||
                (diag.get(x - y) || 0) > 0 ||
                (antiDiag.get(x + y) || 0) > 0,
        );

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const px = x + dx;
                const py = y + dy;
                const key = `${px},${py}`;
                if (on.has(key)) {
                    on.delete(key);
                    bump(row, px, -1);
                    bump(col, py, -1);
                    bump(diag, px - py, -1);
                    bump(antiDiag, px + py, -1);
                }
            }
        }
    }

    return ans;
}
