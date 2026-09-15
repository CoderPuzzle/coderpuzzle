/**
 * @param {number} n
 * @param {number} delay
 * @param {number} forget
 * @return {number}
 */
var peopleAwareOfSecret = function (n, delay, forget) {
    const MOD = 1000000007;
    // know[d] = number of people who first learn the secret on day d;
    // day 1 seeds the whole cascade
    const know = new Array(n + 1).fill(0);
    know[1] = 1;
    for (let day = 2; day <= n; day++) {
        let total = 0;
        // sharers still active on `day` are those who learned on some d
        // with d + delay <= day <= d + forget - 1; both window endpoints
        // advance by one per day, a sliding window clamped at day 1
        const lo = Math.max(1, day - forget + 1);
        const hi = day - delay;
        for (let d = lo; d <= hi; d++) {
            total += know[d];
        }
        know[day] = total % MOD;
    }
    // aware at the end of day n = learned within the last forget - 1
    // days; earlier learners have forgotten
    let answer = 0;
    for (let d = n - forget + 1; d <= n; d++) {
        answer += know[d];
    }
    return answer % MOD;
};
