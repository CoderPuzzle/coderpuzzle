/**
 * @param {number[]} technique1
 * @param {number[]} technique2
 * @param {number} k
 * @return {number}
 */
var maxPoints = function (technique1, technique2, k) {
    // Taking technique 1 everywhere satisfies any k, so start there and
    // switch tasks to technique 2 in descending order of the gain
    // technique2[i] - technique1[i], never exceeding n - k switches. A
    // switch only helps while its gain is positive; because gains arrive
    // largest-first, every prefix is the best use of that many switches,
    // so the answer is the running maximum over those totals. Totals reach
    // 10^10 — exact in doubles.
    let total = 0;
    for (const a of technique1) total += a;
    let best = total;
    const gains = technique1.map((a, i) => technique2[i] - a);
    gains.sort((x, y) => y - x);
    let budget = technique1.length - k;
    for (const gain of gains) {
        if (budget === 0 || gain <= 0) break;
        total += gain;
        budget--;
        if (total > best) best = total;
    }
    return best;
};
