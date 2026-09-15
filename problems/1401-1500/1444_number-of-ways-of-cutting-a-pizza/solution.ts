function ways(pizza: string[], k: number): number {
    const MOD = 1000000007;
    const rows = pizza.length;
    const cols = pizza[0].length;
    // apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
    const apples: number[][] = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
    for (let r = rows - 1; r >= 0; r--) {
        for (let c = cols - 1; c >= 0; c--) {
            apples[r][c] = apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1] + (pizza[r][c] === "A" ? 1 : 0);
        }
    }
    const memo = new Map<number, number>();
    const count = (r: number, c: number, remaining: number): number => {
        if (apples[r][c] === 0) {
            return 0;
        }
        if (remaining === 0) {
            return 1;
        }
        const key = r * 1000000 + c * 100 + remaining;
        if (memo.has(key)) {
            return memo.get(key)!;
        }
        let total = 0;
        // Horizontal cuts: hand away rows r..i-1, keep (i, c).
        for (let i = r + 1; i < rows; i++) {
            if (apples[r][c] - apples[i][c] > 0) {
                total += count(i, c, remaining - 1);
            }
        }
        // Vertical cuts: hand away columns c..j-1, keep (r, j).
        for (let j = c + 1; j < cols; j++) {
            if (apples[r][c] - apples[r][j] > 0) {
                total += count(r, j, remaining - 1);
            }
        }
        const value = total % MOD;
        memo.set(key, value);
        return value;
    };
    return count(0, 0, k - 1);
}
