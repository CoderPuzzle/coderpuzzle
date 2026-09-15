/**
 * @param {string} s
 * @param {number} t
 * @return {number}
 */
var lengthAfterTransformations = function (s, t) {
    // Only the per-letter counts matter. One transformation shifts the
    // 26-vector one letter up (each of b..z receives its predecessor's
    // count) and splits every z into an a and a b: after the shift the
    // new counts[0] is the old z-count, and the old a-count gains the old
    // z-count on top. Reducing counts[1] below MOD per sweep keeps every
    // entry below MOD forever. Every value handled here stays below
    // 2 * 10^9 + 14, exact in IEEE doubles; the 26-bucket total reaches
    // ~2.7 * 10^10, still far under 2^53.
    const MOD = 1000000007;
    const counts = new Array(26).fill(0);
    for (const ch of s) {
        counts[ch.charCodeAt(0) - 97] += 1;
    }
    for (let step = 0; step < t; step += 1) {
        const z = counts[25];
        for (let j = 25; j >= 1; j -= 1) {
            counts[j] = counts[j - 1];
        }
        counts[0] = z;
        counts[1] = (counts[1] + z) % MOD;
    }
    let total = 0;
    for (let j = 0; j < 26; j += 1) {
        total += counts[j];
    }
    return total % MOD;
};
