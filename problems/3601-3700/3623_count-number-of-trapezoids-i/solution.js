/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function (points) {
    const MOD = 1000000007;
    // a, b < MOD < 2^30: split a so every partial product stays far
    // below 2^53, keeping Numbers exact where a * b itself would not.
    const mulmod = (a, b) => {
        const hi = Math.floor(a / 32768);
        const lo = a - hi * 32768;
        return (((hi * b) % MOD) * 32768 + ((lo * b) % MOD)) % MOD;
    };
    // A horizontal trapezoid is exactly: two points on one horizontal
    // line and two on another. Count each line's pairs, then combine.
    const rows = new Map();
    for (const p of points) rows.set(p[1], (rows.get(p[1]) || 0) + 1);
    // Per-line pair counts s = C(c, 2) reach ~5e9, and the pair
    // products range far past 2^53 — reduce modulo the prime as every
    // value is produced, using mulmod wherever two residues meet.
    let total = 0;
    let squared = 0;
    for (const count of rows.values()) {
        const pairs = ((count * (count - 1)) / 2) % MOD;
        total = (total + pairs) % MOD;
        squared = (squared + mulmod(pairs, pairs)) % MOD;
    }
    // The sum over line pairs s_i * s_j equals (total^2 - squared)/2;
    // dividing by 2 becomes multiplying by the inverse of 2.
    const inv2 = (MOD + 1) / 2;
    const diff = (mulmod(total, total) - squared + MOD) % MOD;
    return mulmod(diff, inv2);
};
