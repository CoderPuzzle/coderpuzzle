/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function (digits, n) {
    // Numbers shorter than n are composeable by construction and all
    // fall below n; for n's own length, walk its digits: a set digit
    // strictly below the current one fixes a smaller prefix and frees
    // the remaining positions, while the equal path survives only
    // while n's own digit stays in the set.
    const s = String(n);
    const length = s.length;
    const k = digits.length;
    const has = new Array(10).fill(false);
    for (const d of digits) {
        has[Number(d)] = true;
    }
    const below = new Array(10).fill(0);
    for (let v = 1; v < 10; v++) {
        below[v] = below[v - 1] + (has[v - 1] ? 1 : 0);
    }
    const powers = new Array(length + 1).fill(1);
    for (let j = 1; j <= length; j++) {
        powers[j] = powers[j - 1] * k;
    }
    let total = 0;
    for (let len = 1; len < length; len++) {
        total += powers[len];
    }
    let alive = true;
    for (let i = 0; i < length; i++) {
        const v = Number(s[i]);
        // Set digits below n's digit v leave the tail free.
        total += below[v] * powers[length - 1 - i];
        if (!has[v]) {
            // The equal path dies here: no prefix of n extends past v.
            alive = false;
            break;
        }
    }
    if (alive) {
        // Every digit of n is in the set, so n itself counts.
        total += 1;
    }
    return total;
};
