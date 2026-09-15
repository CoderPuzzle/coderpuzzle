/**
 * @param {number} n
 * @return {number}
 */
var numDupDigitsAtMostN = function (n) {
    // Complement counting: tally numbers in [1, n] with all-distinct digits.
    const str = String(n);
    const digits = [];
    for (let i = 0; i < str.length; i++) digits.push(str.charCodeAt(i) - 48);
    const length = digits.length;

    // Every length strictly shorter than n's own length:
    // 9 first digits (no leading zero), then 9*8*7*...
    let distinct = 0;
    for (let d = 1; d < length; d++) {
        let prod = 9;
        for (let i = 1; i < d; i++) prod *= 10 - i;
        distinct += prod;
    }

    // Walk n's own digit string prefix by prefix.
    let usedMask = 0;
    let repeated = false;
    for (let i = 0; i < length; i++) {
        const digit = digits[i];
        const start = i === 0 ? 1 : 0;
        // Each smaller unused candidate digit fixes a distinct prefix; the
        // remaining slots take any falling permutation of unused digits.
        let smaller = 0;
        for (let cand = start; cand < digit; cand++) {
            if ((usedMask & (1 << cand)) === 0) smaller++;
        }
        const remaining = length - i - 1;
        let perms = 1;
        let avail = 10 - (i + 1);
        for (let r = 0; r < remaining; r++) {
            perms *= avail;
            avail--;
        }
        distinct += smaller * perms;
        // A repeated digit here means no longer number shares this prefix.
        if ((usedMask & (1 << digit)) !== 0) {
            repeated = true;
            break;
        }
        usedMask |= 1 << digit;
    }
    // The walk never broke: n itself has all-distinct digits.
    if (!repeated) distinct += 1;

    return n - distinct;
};
