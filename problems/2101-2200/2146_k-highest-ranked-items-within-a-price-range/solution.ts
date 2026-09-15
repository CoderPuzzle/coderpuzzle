function highestRankedKItems(grid: number[][], pricing: number[], start: number[], k: number): number[][] {
    const rows = grid.length;
    const columns = grid[0].length;
    const distance: number[][] = Array.from({ length: rows }, () => new Array<number>(columns).fill(-1));
    distance[start[0]][start[1]] = 0;
    const queue: number[][] = [[start[0], start[1]]];
    const candidates: number[][] = [];
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    for (let head = 0; head < queue.length; head++) {
        const [row, column] = queue[head];
        const price = grid[row][column];
        if (pricing[0] <= price && price <= pricing[1]) {
            candidates.push([distance[row][column], price, row, column]);
        }
        for (const [dr, dc] of directions) {
            const nr = row + dr;
            const nc = column + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] > 0 && distance[nr][nc] === -1) {
                distance[nr][nc] = distance[row][column] + 1;
                queue.push([nr, nc]);
            }
        }
    }
    candidates.sort((left, right) => {
        for (let index = 0; index < 4; index++) {
            if (left[index] !== right[index]) return left[index] - right[index];
        }
        return 0;
    });
    return candidates.slice(0, k).map((candidate) => [candidate[2], candidate[3]]);
}
