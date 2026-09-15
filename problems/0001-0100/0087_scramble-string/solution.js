/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function (s1, s2) {
    // Memoized recursion over string pairs. Two guards run before any split
    // work: identical strings are trivially scrambles, and a pair whose
    // letter counts differ can never be one, since swapping blocks of a
    // string only rearranges its letters.
    const memo = new Map();

    // A scramble never adds or removes a letter, so a count mismatch rules
    // the pair out before any split is tried.
    function sameLetters(a, b) {
        const counts = new Array(26).fill(0);
        for (const ch of a) {
            counts[ch.charCodeAt(0) - 97] += 1;
        }
        for (const ch of b) {
            counts[ch.charCodeAt(0) - 97] -= 1;
        }
        return counts.every((count) => count === 0);
    }

    // The pair (a + "|" + b) keys the memo; '|' cannot occur in the inputs.
    function solve(a, b) {
        if (a === b) {
            return true;
        }
        if (!sameLetters(a, b)) {
            return false;
        }
        const key = a + "|" + b;
        if (memo.has(key)) {
            return memo.get(key);
        }
        const n = a.length;
        for (let i = 1; i < n; i++) {
            // Keep the halves in order: the split of b sits at the same
            // index as the split of a.
            if (solve(a.slice(0, i), b.slice(0, i)) && solve(a.slice(i), b.slice(i))) {
                memo.set(key, true);
                return true;
            }
            // Swap the halves: the head of a pairs with the tail of b.
            if (solve(a.slice(0, i), b.slice(n - i)) && solve(a.slice(i), b.slice(0, n - i))) {
                memo.set(key, true);
                return true;
            }
        }
        memo.set(key, false);
        return false;
    }

    return solve(s1, s2);
};
