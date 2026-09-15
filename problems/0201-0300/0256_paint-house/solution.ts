function minCost(costs: number[][]): number {
    // Cheapest totals that leave house i red, blue, or green; a color
    // may not extend its own ending, which is the adjacency rule.
    let red = costs[0][0],
        blue = costs[0][1],
        green = costs[0][2];
    for (let i = 1; i < costs.length; ++i) {
        const cost = costs[i];
        // Each next ending is computed from the previous ones before any
        // variable is overwritten.
        const nextRed = cost[0] + Math.min(blue, green);
        const nextBlue = cost[1] + Math.min(red, green);
        const nextGreen = cost[2] + Math.min(red, blue);
        red = nextRed;
        blue = nextBlue;
        green = nextGreen;
    }
    // The last house may end in any color, so the answer is the cheapest
    // of the three surviving endings.
    return Math.min(red, blue, green);
}
