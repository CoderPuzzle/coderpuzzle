function construct2DArray(original: number[], m: number, n: number): number[][] {
    if (m * n !== original.length) return [];

    const result: number[][] = Array.from({ length: m }, () => new Array<number>(n));
    for (let row = 0; row < m; ++row) {
        for (let column = 0; column < n; ++column) {
            result[row][column] = original[row * n + column];
        }
    }
    return result;
}
