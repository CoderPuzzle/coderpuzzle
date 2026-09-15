/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var largestPalindrome = function (n, k) {
    // A palindrome of length n is pinned down by its first ceil(n/2) digits,
    // and its remainder mod k is a digit-weight sum: half-position j carries
    // its own place value plus its mirror's (the odd-length middle has no
    // separate mirror), so everything runs on residues mod k, never on the
    // full number. For each suffix of the half, track which residues the
    // still-free digits can add; then scan the half left to right, taking
    // the largest digit whose leftover residue stays reachable — the last
    // free digit closes it exactly to zero.
    const m = Math.floor((n + 1) / 2);
    const powSmall = new Array(m).fill(1 % k);
    for (let j = 1; j < m; j++) {
        powSmall[j] = (powSmall[j - 1] * 10) % k;
    }
    let base = 1 % k;
    for (let i = 0; i < n - m; i++) {
        base = (base * 10) % k;
    }
    const weights = new Array(m);
    for (let j = 0; j < m; j++) {
        weights[j] = (base * powSmall[m - 1 - j] + (2 * j !== n - 1 ? powSmall[j] : 0)) % k;
    }
    const full = (1 << k) - 1;

    const cache = new Int32Array(512 * 10).fill(-1);
    const reachable = new Int32Array(m + 1);
    reachable[m] = 1;
    for (let j = m - 1; j >= 0; j--) {
        const mask = reachable[j + 1];
        const w = weights[j];
        const key = mask * 10 + w;
        if (cache[key] < 0) {
            let out = mask;
            let shift = 0;
            for (let t = 0; t < 9; t++) {
                shift = (shift + w) % k;
                out |= shift === 0 ? mask : ((mask << shift) | (mask >> (k - shift))) & full;
            }
            cache[key] = out;
        }
        reachable[j] = cache[key];
    }

    const half = new Array(m);
    let need = 0;
    for (let j = 0; j < m; j++) {
        const low = j === 0 ? 1 : 0;
        for (let d = 9; d >= low; d--) {
            const rest = (((need - d * weights[j]) % k) + k) % k;
            if ((reachable[j + 1] >> rest) & 1) {
                need = rest;
                half[j] = d;
                break;
            }
        }
    }
    const bodyLen = n % 2 === 0 ? m : m - 1;
    const out = [];
    for (const d of half) {
        out.push(d);
    }
    for (let j = bodyLen - 1; j >= 0; j--) {
        out.push(half[j]);
    }
    return out.join("");
};
