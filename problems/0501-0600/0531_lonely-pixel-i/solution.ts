function findLonelyPixel(picture: string[][]): number {
    // A pixel is lonely exactly when it is the only 'B' in its row and
    // the only 'B' in its column. One pass tallies both totals per row
    // and per column; a second pass checks each 'B' against them.
    const m = picture.length;
    const n = picture[0].length;
    const rowCount = new Array<number>(m).fill(0);
    const colCount = new Array<number>(n).fill(0);
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === "B") {
                rowCount[i]++;
                colCount[j]++;
            }
        }
    }
    let lonely = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (picture[i][j] === "B" && rowCount[i] === 1 && colCount[j] === 1) {
                lonely++;
            }
        }
    }
    return lonely;
}
