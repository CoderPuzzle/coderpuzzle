function maxVacationDays(flights: number[][], days: number[][]): number {
    const n = flights.length;
    const k = days[0].length;
    // dp[city] = best vacation total through the weeks handled so far;
    // -1 marks the cities no schedule has reached yet.
    let dp: number[] = new Array(n).fill(-1);
    // Before week 0 the traveler sits in city 0 with nothing banked, so
    // week 0's own step encodes the first Monday's flight.
    dp[0] = 0;
    for (let w = 0; w < k; ++w) {
        const ndp: number[] = new Array(n).fill(-1);
        for (let j = 0; j < n; ++j) {
            for (let i = 0; i < n; ++i) {
                if (dp[i] < 0) {
                    continue;
                }
                // One decision per week: a Monday flight i -> j, or
                // staying put (i === j) at no flight cost.
                if (i === j || flights[i][j] === 1) {
                    const total = dp[i] + days[j][w];
                    if (total > ndp[j]) {
                        ndp[j] = total;
                    }
                }
            }
        }
        dp = ndp;
    }
    // Staying in a city is always allowed, so the start city keeps some
    // schedule alive every week.
    return Math.max(...dp);
}
