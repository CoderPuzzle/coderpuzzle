function calculateMinimumHP(dungeon: number[][]): number {
    // need[j] is the least health that saves the knight from column j of
    // the row being folded; index n is a sentinel wall past the right edge.
    const n = dungeon[0].length;
    const need: number[] = new Array(n + 1).fill(1000000000);
    need[n - 1] = 1;
    for (let i = dungeon.length - 1; i >= 0; --i) {
        for (let j = n - 1; j >= 0; --j) {
            // Scan right-to-left: need[j] is still the room below while
            // need[j + 1] is already this row, exactly the two moves.
            need[j] = Math.max(1, Math.min(need[j], need[j + 1]) - dungeon[i][j]);
        }
    }
    return need[0];
}
