function buyChoco(prices: number[], money: number): number {
    // The cheapest pair is the two smallest prices; one pass tracks
    // them without sorting.
    let first = 101;
    let second = 101;
    for (const price of prices) {
        if (price < first) {
            second = first;
            first = price;
        } else if (price < second) {
            second = price;
        }
    }
    if (first + second > money) {
        return money;
    }
    return money - first - second;
}
