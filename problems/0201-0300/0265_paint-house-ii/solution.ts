function minCostII(costs: number[][]): number {
    // Cheapest totals that leave the previous house painted each color,
    // compressed to the smallest, the second smallest, and the color
    // holding the smallest; a color may not extend its own ending.
    let smallest = 0,
        second = 0,
        smallestColor = -1;
    for (const cost of costs) {
        // One pass over the row: every color takes the smallest previous
        // ending unless it IS the smallest's color, when only the second
        // smallest may legally be extended.
        let nextSmallest = 1 << 30,
            nextSecond = 1 << 30,
            nextColor = -1;
        for (let color = 0; color < cost.length; ++color) {
            const ending = cost[color] + (color === smallestColor ? second : smallest);
            if (ending < nextSmallest) {
                nextSecond = nextSmallest;
                nextSmallest = ending;
                nextColor = color;
            } else if (ending < nextSecond) {
                nextSecond = ending;
            }
        }
        smallest = nextSmallest;
        second = nextSecond;
        smallestColor = nextColor;
    }
    // The last house may end in any color, and the smallest ending is the
    // cheapest of them.
    return smallest;
}
