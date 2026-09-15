// Only the per-letter counts matter. One transformation shifts the
// 26-vector one letter up (each of b..z receives its predecessor's count)
// and splits every z into an a and a b: after the shift the new
// counts[0] is the old z-count, and the old a-count gains the old z-count
// on top. Reducing counts[1] below MOD per sweep keeps every entry below
// MOD forever: a sweep's entries stay below 2 * MOD < 2^31, but the
// 26-bucket total reaches ~2.7 * 10^10, so the final sum accumulates in
// a long.
function lengthAfterTransformations(s: string, t: number): number {
    const MOD = 1000000007;
    const counts: number[] = new Array(26).fill(0);
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
}
