function maxTotalReward(rewardValues: number[]): number {
    const values = Array.from(new Set(rewardValues)).sort((a, b) => a - b);
    let dp = 1n;
    for (const x of values) {
        const mask = (1n << BigInt(x)) - 1n;
        dp |= (dp & mask) << BigInt(x);
    }
    return dp.toString(2).length - 1;
}
