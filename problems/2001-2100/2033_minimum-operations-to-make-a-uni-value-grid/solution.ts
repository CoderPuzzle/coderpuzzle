function minOperations(grid: number[][], x: number): number {
    const values: number[] = [];
    for (const row of grid) {
        for (const value of row) values.push(value);
    }
    const remainder = values[0] % x;
    if (values.some((value) => value % x !== remainder)) return -1;

    values.sort((a, b) => a - b);
    const median = values[Math.floor(values.length / 2)];
    return values.reduce((operations, value) => operations + Math.abs(value - median) / x, 0);
}
