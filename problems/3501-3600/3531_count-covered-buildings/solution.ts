function countCoveredBuildings(n: number, buildings: number[][]): number {
    // Per x-line: extreme y values; per y-line: extreme x values. A
    // building is covered exactly when it is strictly inside both.
    const rowMinY = new Array(n + 1).fill(n + 1);
    const rowMaxY = new Array(n + 1).fill(0);
    const colMinX = new Array(n + 1).fill(n + 1);
    const colMaxX = new Array(n + 1).fill(0);
    for (const [x, y] of buildings) {
        if (y < rowMinY[x]) rowMinY[x] = y;
        if (y > rowMaxY[x]) rowMaxY[x] = y;
        if (x < colMinX[y]) colMinX[y] = x;
        if (x > colMaxX[y]) colMaxX[y] = x;
    }
    let covered = 0;
    for (const [x, y] of buildings) {
        if (rowMinY[x] < y && y < rowMaxY[x] && colMinX[y] < x && x < colMaxX[y]) {
            covered++;
        }
    }
    return covered;
}
