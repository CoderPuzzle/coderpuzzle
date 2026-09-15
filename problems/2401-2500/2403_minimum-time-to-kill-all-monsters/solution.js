/**
 * @param {number[]} power
 * @return {number}
 */
var minimumTime = function (power) {
    const n = power.length;
    const full = (1 << n) - 1;
    const INF = Infinity;
    // dp[mask] = min days to have defeated exactly the set `mask`.
    // The state suffices because the daily gain depends only on
    // |mask| and mana resets after every kill.
    const dp = new Array(full + 1).fill(INF);
    dp[0] = 0;
    // Increasing numeric order is a valid evaluation order: setting a
    // bit always yields a strictly larger mask, so each state is final
    // before anything extends it.
    for (let mask = 0; mask <= full; mask++) {
        if (dp[mask] === INF) continue;
        const gain = popcount(mask) + 1;
        for (let j = 0; j < n; j++) {
            if ((mask & (1 << j)) === 0) {
                // Days to bank >= power[j] mana at `gain` per day.
                const days = Math.ceil(power[j] / gain);
                const nxt = mask | (1 << j);
                if (dp[mask] + days < dp[nxt]) dp[nxt] = dp[mask] + days;
            }
        }
    }
    return dp[full];
};

function popcount(x) {
    let c = 0;
    while (x > 0) {
        x &= x - 1;
        c++;
    }
    return c;
}
