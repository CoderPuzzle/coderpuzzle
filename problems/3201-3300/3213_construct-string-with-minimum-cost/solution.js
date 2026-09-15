/**
 * @param {string} target
 * @param {string[]} words
 * @param {number[]} costs
 * @return {number}
 */
var minimumCost = function (target, words, costs) {
    // Reverse DP over suffixes: dp[i] is the minimum cost to assemble
    // target[i:], dp[n] is 0, and each position extends every word that
    // matches its next characters. Duplicate words collapse to their
    // cheapest cost first; per position only DISTINCT word lengths matter,
    // and their count never exceeds sqrt(2 * total word characters).
    // Walking candidate lengths ascending lets one 32-bit-wrapped polynomial
    // hash of target[i:i+length) extend in O(1) per step; a hash hit only
    // triggers an exact map probe, so correctness never rests on the hash —
    // a collision merely wastes one probe. Every accumulated value stays far
    // below 2^53 (the answer is at most len(target) * max(cost) = 5*10^8),
    // so plain number arithmetic is exact throughout.
    const best = new Map();
    for (let k = 0; k < words.length; k++) {
        const prev = best.get(words[k]);
        if (prev === undefined || costs[k] < prev) {
            best.set(words[k], costs[k]);
        }
    }
    const n = target.length;
    const buckets = new Map(); // word length -> Set of word hashes
    let maxLen = 0;
    for (const word of best.keys()) {
        let h = 0;
        for (let k = 0; k < word.length; k++) {
            h = (h * 131 + word.charCodeAt(k)) % 4294967296;
        }
        if (!buckets.has(word.length)) {
            buckets.set(word.length, new Set());
        }
        buckets.get(word.length).add(h);
        maxLen = Math.max(maxLen, word.length);
    }
    const dp = new Array(n + 1).fill(Infinity);
    dp[n] = 0;
    for (let i = n - 1; i >= 0; i--) {
        let cur = Infinity;
        let h = 0;
        const limit = Math.min(maxLen, n - i);
        for (let length = 1; length <= limit; length++) {
            h = (h * 131 + target.charCodeAt(i + length - 1)) % 4294967296;
            const bucket = buckets.get(length);
            if (bucket !== undefined && bucket.has(h)) {
                const cost = best.get(target.slice(i, i + length));
                if (cost !== undefined) {
                    const nxt = dp[i + length];
                    if (nxt !== Infinity && nxt + cost < cur) {
                        cur = nxt + cost;
                    }
                }
            }
        }
        dp[i] = cur;
    }
    return dp[0] === Infinity ? -1 : dp[0];
};
