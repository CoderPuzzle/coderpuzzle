/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
    const durations = [1, 7, 30];
    const travel = new Set(days);
    const last = days[days.length - 1];
    // dp[d]: cheapest coverage of every travel day up to d.
    const dp = new Array(last + 31).fill(0);
    for (let day = 1; day <= last; day++) {
        if (!travel.has(day)) {
            // No decision on non-travel days; the cost carries forward.
            dp[day] = dp[day - 1];
        } else {
            // A pass of duration u ending today covers (day - u, day];
            // max(0, ...) treats dp[0] = 0 as "nothing before day 1".
            let best = Infinity;
            for (let i = 0; i < durations.length; i++) {
                const prev = Math.max(0, day - durations[i]);
                best = Math.min(best, dp[prev] + costs[i]);
            }
            dp[day] = best;
        }
    }
    return dp[last];
};
