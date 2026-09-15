function maximumProfit(present: number[], future: number[], budget: number): number {
    const dp = new Array<number>(budget + 1).fill(0);
    for (let i = 0; i < present.length; i++) {
        const price = present[i];
        const gain = future[i] - price;
        if (gain <= 0) {
            continue;
        }
        for (let money = budget; money >= price; money--) {
            dp[money] = Math.max(dp[money], dp[money - price] + gain);
        }
    }
    return dp[budget];
}
