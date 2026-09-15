/**
 * @param {string} corridor
 * @return {number}
 */
var numberOfWays = function (corridor) {
    // Sections pair the seats up in order, so exactly one divider is
    // forced between each finished pair and the next seat — placeable
    // at any of the plants-plus-one positions inside that gap.
    const MOD = 1000000007;
    let ways = 1;
    let seats = 0;
    let plants = 0;
    for (const c of corridor) {
        if (c === "S") {
            seats++;
            if (seats > 2 && seats % 2 === 1) {
                // ways stays below 2^30 and plants + 1 below 2^17, so the
                // product is exact in double precision before reducing.
                ways = (ways * (plants + 1)) % MOD;
            }
            plants = 0;
        } else if (seats >= 2) {
            plants++;
        }
    }
    return seats > 0 && seats % 2 === 0 ? ways : 0;
};
