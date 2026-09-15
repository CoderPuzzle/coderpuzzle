/**
 * @param {number[]} ages
 * @return {number}
 */
var numFriendRequests = function (ages) {
    // Counting by age value: ages live in 1..120, so bucket every
    // person by age and judge each ordered pair of age values once.
    const count = new Array(121).fill(0);
    for (const age of ages) {
        ++count[age];
    }
    let total = 0;
    for (let a = 1; a <= 120; ++a) {
        if (count[a] === 0) {
            continue;
        }
        for (let b = 1; b <= 120; ++b) {
            if (count[b] === 0) {
                continue;
            }
            // x sends to y iff none of the three blocks holds; the
            // half-age test 2*b <= a + 14 is ages[y] <= 0.5*ages[x] + 7
            // in exact integer arithmetic.
            if (2 * b <= a + 14 || b > a || (b > 100 && a < 100)) {
                continue;
            }
            // Same-age pairs cannot target oneself, so the diagonal
            // counts count*(count - 1), not count*count.
            total += a === b ? count[a] * (count[b] - 1) : count[a] * count[b];
        }
    }
    return total;
};
