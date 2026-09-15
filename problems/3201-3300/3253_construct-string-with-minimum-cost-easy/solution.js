/**
 * @param {string} target
 * @param {string[]} words
 * @param {number[]} costs
 * @return {number}
 */
var minimumCost = function (target, words, costs) {
    // Forward DP over prefixes: dp[i] is the minimum cost to assemble
    // target[:i], dp[0] is 0, and every reachable position extends each
    // DISTINCT word matching its next characters. Duplicate words first
    // collapse to their cheapest occurrence. The Easy bounds are small —
    // at most 50 words against a target of at most 2000 characters — so
    // a direct scan of all words at all positions suffices; greedy
    // longest-match fails (a pricey long word can block cheaper short
    // ones), and an unreachable dp[n] is the -1 case. startsWith with an
    // offset never reads past the end, so words longer than the remaining
    // suffix are rejected safely. Every accumulated value stays far below
    // 2^53 (any achievable cost is at most len(target) * max(cost) =
    // 2 * 10^8), so plain number arithmetic is exact throughout.
    const best = new Map();
    for (let k = 0; k < words.length; k++) {
        const prev = best.get(words[k]);
        if (prev === undefined || costs[k] < prev) {
            best.set(words[k], costs[k]);
        }
    }
    const n = target.length;
    const big = Infinity;
    const dp = new Array(n + 1).fill(big);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const base = dp[i];
        if (base === big) {
            continue;
        }
        for (const [word, cost] of best) {
            const j = i + word.length;
            if (j <= n && base + cost < dp[j] && target.startsWith(word, i)) {
                dp[j] = base + cost;
            }
        }
    }
    return dp[n] === big ? -1 : dp[n];
};
