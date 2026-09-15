function maximumWhiteTiles(tiles: number[][], carpetLen: number): number {
    // Sort by start, then slide a window of intervals whose left ends fall
    // inside the carpet. Aligning the carpet's left edge with a tile start is
    // always optimal, so trying every tile as the first covered one is enough.
    tiles.sort((a, b) => a[0] - b[0]);
    const n = tiles.length;
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + (tiles[i][1] - tiles[i][0] + 1);
    }
    let ans = 0;
    let j = 0;
    for (let i = 0; i < n; i++) {
        const end = tiles[i][0] + carpetLen - 1;
        while (j < n && tiles[j][0] <= end) {
            j++;
        }
        let covered = prefix[j] - prefix[i];
        if (tiles[j - 1][1] > end) {
            covered -= tiles[j - 1][1] - end;
        }
        ans = Math.max(ans, covered);
    }
    return ans;
}
