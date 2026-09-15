function createGrid(m: number, n: number, k: number): string[] {
    if (m === 1 || n === 1) {
        if (k !== 1) {
            return [];
        }
        return new Array<string>(m).fill(".".repeat(n));
    }

    // [height, width, is the 3x3 k=4 pattern] per k, tried in order.
    let blocks: number[][];
    if (k === 1) {
        blocks = [[1, 1, 0]];
    } else if (k === 2) {
        blocks = [[2, 2, 0]];
    } else if (k === 3) {
        blocks = [
            [2, 3, 0],
            [3, 2, 0],
        ];
    } else {
        blocks = [
            [2, 4, 0],
            [4, 2, 0],
            [3, 3, 1],
        ];
    }
    for (const [height, width, flag] of blocks) {
        if (height > m || width > n) {
            continue;
        }
        const grid: string[][] = Array.from({ length: m }, () => "#".repeat(n).split(""));
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                grid[i][j] = ".";
            }
        }
        if (flag === 1) {
            grid[0][width - 1] = "#";
            grid[height - 1][0] = "#";
        }
        for (let j = width - 1; j < n; j++) {
            grid[height - 1][j] = ".";
        }
        for (let i = height - 1; i < m; i++) {
            grid[i][n - 1] = ".";
        }
        return grid.map((row) => row.join(""));
    }
    return [];
}
