/**
 * @param {number[]} value
 * @param {number[]} decay
 * @param {number} m
 * @return {number}
 */
var maxTotalValue = function (value, decay, m) {
    // Gains reach value[i] * m <= 10^18 and counts reach n * max(count) also
    // ~10^14+, beyond 2^53 — BigInt keeps the arithmetic exact before the
    // final modulo.
    const M = 1000000007n;
    m = BigInt(m);
    const bigValue = value.map(BigInt);
    const bigDecay = decay.map(BigInt);
    // count(g): how many gains across all indices are >= g. It can overflow
    // any fixed bound, so it stops early once the count passes m.
    const count = (g) => {
        let total = 0n;
        for (let i = 0; i < bigValue.length; i++) {
            if (bigValue[i] >= g) {
                total += (bigValue[i] - g) / bigDecay[i] + 1n;
                if (total > m) return m + 1n;
            }
        }
        return total;
    };
    // total(g): sum of every gain >= g, modulo M, via the arithmetic
    // progression formula c * a - decay * c * (c - 1) / 2.
    const total = (g) => {
        let sum = 0n;
        for (let i = 0; i < bigValue.length; i++) {
            if (bigValue[i] >= g) {
                const c = (bigValue[i] - g) / bigDecay[i] + 1n;
                sum = (sum + c * bigValue[i] - (bigDecay[i] * c * (c - 1n)) / 2n) % M;
            }
        }
        return (sum + M) % M;
    };
    // Fewer than m positive gains exist: take them all.
    if (count(1n) <= m) return Number(total(1n));
    let maximum = 0;
    for (const entry of value) maximum = Math.max(maximum, entry);
    // Largest threshold g whose gain pool still fills m selections.
    let low = 1n;
    let high = BigInt(maximum);
    while (low < high) {
        const mid = (low + high + 1n) / 2n;
        if (count(mid) >= m) low = mid;
        else high = mid - 1n;
    }
    // Take every gain above g, then pad with m - remaining copies of g.
    const above = count(low + 1n);
    return Number((total(low + 1n) + (m - above) * low) % M);
};
