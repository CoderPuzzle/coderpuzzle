function numSubmatrixSumTarget(matrix: number[][], target: number): number {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const vpref: number[][] = [];
    for (let r = 0; r <= rows; r++) vpref.push(new Array(cols).fill(0));
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            vpref[r + 1][c] = vpref[r][c] + matrix[r][c];
        }
    }

    let count = 0;
    for (let top = 0; top < rows; top++) {
        for (let bottom = top; bottom < rows; bottom++) {
            const hist = new Map<number, number>();
            hist.set(0, 1);
            let running = 0;
            for (let c = 0; c < cols; c++) {
                const colSum = vpref[bottom + 1][c] - vpref[top][c];
                running += colSum;
                const prev = hist.get(running - target);
                if (prev !== undefined) count += prev;
                hist.set(running, (hist.get(running) || 0) + 1);
            }
        }
    }
    return count;
}
