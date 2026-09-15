function missingRolls(rolls: number[], mean: number, n: number): number[] {
    const observedSum = rolls.reduce((sum, roll) => sum + roll, 0);
    const required = mean * (rolls.length + n) - observedSum;
    if (required < n || required > 6 * n) {
        return [];
    }

    const base = Math.floor(required / n);
    const remainder = required % n;
    const missing = new Array<number>(n).fill(base);
    for (let i = 0; i < remainder; ++i) {
        missing[i]++;
    }
    return missing;
}
