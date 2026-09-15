function maxSum(grid: number[][], limits: number[], k: number): number {
    // Every value is non-negative, so an optimal selection can be found
    // among each row's top limits[i] values: pool those candidates, sort
    // descending, and sum the first k. The sum may reach 2.5e10, far below
    // 2^53, so numbers stay exact throughout.
    const pool: number[] = [];
    for (let i = 0; i < grid.length; i++) {
        const row = [...grid[i]].sort((a, b) => b - a);
        for (let j = 0; j < Math.min(limits[i], row.length); j++) {
            pool.push(row[j]);
        }
    }
    pool.sort((a, b) => b - a);
    let total = 0;
    for (let j = 0; j < Math.min(k, pool.length); j++) {
        total += pool[j];
    }
    return total;
}
