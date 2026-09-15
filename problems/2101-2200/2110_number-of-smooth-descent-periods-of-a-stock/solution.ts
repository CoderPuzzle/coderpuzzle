function getDescentPeriods(prices: number[]): number {
    let run = 1;
    let total = 1;
    for (let index = 1; index < prices.length; index++) {
        run = prices[index - 1] - prices[index] === 1 ? run + 1 : 1;
        total += run;
    }
    return total;
}
