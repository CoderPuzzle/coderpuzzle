function maxProfit(prices: number[], fee: number): number {
    // cash: best profit holding no share; hold: best profit holding one.
    // The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
    let cash = 0,
        hold = -1e18;
    for (const price of prices) {
        // Both maxes read yesterday's values: sell charges the fee once,
        // on the sell leg; buy subtracts the price.
        const newCash = Math.max(cash, hold + price - fee);
        const newHold = Math.max(hold, cash - price);
        cash = newCash;
        hold = newHold;
    }
    // Ending with a share in hand is never better than having sold.
    return cash;
}
