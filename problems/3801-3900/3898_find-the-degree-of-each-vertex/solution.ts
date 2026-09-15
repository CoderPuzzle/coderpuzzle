function findDegrees(matrix: number[][]): number[] {
    return matrix.map((row) => row.reduce((degree, edge) => degree + edge, 0));
}
