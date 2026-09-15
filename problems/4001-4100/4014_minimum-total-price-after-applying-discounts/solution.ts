function minPrice(prices: number[], discounts: number[]): number {
    // Sort both descending and pair positionally: by the exchange
    // argument, largest discount on largest price maximizes p*d/100.
    prices.sort((a, b) => b - a);
    discounts.sort((a, b) => b - a);
    let saved = 0;
    let total = 0;
    for (let i = 0; i < prices.length; ++i) {
        total += prices[i];
        if (i < discounts.length) {
            saved += prices[i] * discounts[i];
        }
    }
    // total * 100 stays below 2^53, so Number arithmetic is exact until
    // the single division, which rounds the rational total correctly.
    return (total * 100 - saved) / 100;
}
