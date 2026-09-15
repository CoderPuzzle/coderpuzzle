/**
 * @param {number} d
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var digitsCount = function (d, low, high) {
    const countUpTo = (d, n) => {
        if (n <= 0) {
            return 0;
        }
        const s = String(n);
        const digits = [];
        for (let i = 0; i < s.length; i++) {
            digits.push(s.charCodeAt(i) - 48);
        }
        // Free (non-tight) suffixes recur, so they are memoized per
        // (position, started): [completions, occurrences] pairs.
        const memo = new Map();
        // Each state reports how many suffix completions it admits and how
        // many appearances of d those completions contain.
        const solve = (pos, tight, started) => {
            if (pos === digits.length) {
                return [1, 0];
            }
            const key = pos * 2 + (started ? 1 : 0);
            if (!tight && memo.has(key)) {
                return memo.get(key);
            }
            const maxDigit = tight ? digits[pos] : 9;
            let completions = 0;
            let occurrences = 0;
            for (let digit = 0; digit <= maxDigit; digit++) {
                const inner = solve(pos + 1, tight && digit === maxDigit, started || digit > 0);
                completions += inner[0];
                occurrences += inner[1];
                // Placing d here shows d in every completion below, unless it
                // is a leading zero -- those are never written.
                if (digit === d && (started || digit > 0)) {
                    occurrences += inner[0];
                }
            }
            const state = [completions, occurrences];
            if (!tight) {
                memo.set(key, state);
            }
            return state;
        };
        // The all-zero completion is the number 0 and carries no
        // appearances, so the walk tallies exactly the integers 1..n.
        return solve(0, true, false)[1];
    };
    // Prefix-count reduction: occurrences in [low, high] = f(high) - f(low-1).
    return countUpTo(d, high) - countUpTo(d, low - 1);
};
