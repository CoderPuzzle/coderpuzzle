function countSubIslands(grid1: number[][], grid2: number[][]): number {
    const m = grid2.length,
        n = grid2[0].length;
    const seen: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));
    let count = 0;
    for (let si = 0; si < m; si++) {
        for (let sj = 0; sj < n; sj++) {
            if (grid2[si][sj] === 1 && !seen[si][sj]) {
                seen[si][sj] = true;
                const stack: [number, number][] = [[si, sj]];
                let isSub = true;
                while (stack.length > 0) {
                    const [x, y] = stack.pop()!;
                    if (grid1[x][y] !== 1) isSub = false;
                    for (const [dx, dy] of [
                        [1, 0],
                        [-1, 0],
                        [0, 1],
                        [0, -1],
                    ] as const) {
                        const nx = x + dx,
                            ny = y + dy;
                        if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid2[nx][ny] === 1 && !seen[nx][ny]) {
                            seen[nx][ny] = true;
                            stack.push([nx, ny]);
                        }
                    }
                }
                if (isSub) count++;
            }
        }
    }
    return count;
}
