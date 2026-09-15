/**
 * @param {number[]} piles
 * @return {boolean}
 */
var nimGame = function (piles) {
    // Game-tree DP: the mover with no stones left to take loses, and a
    // position is won exactly when some move — pick a pile, reduce it —
    // strands the opponent on a lost position. Memoize on the sorted
    // pile vector: pile order never changes the move options, so every
    // distinct position is decided exactly once.
    const memo = new Map();

    const wins = (raw) => {
        const state = [...raw].sort((a, b) => a - b);
        const key = state.join(",");
        if (memo.has(key)) return memo.get(key);
        for (let i = 0; i < state.length; ++i) {
            for (let take = 1; take <= state[i]; ++take) {
                const nxt = state.slice();
                nxt[i] -= take;
                if (!wins(nxt)) {
                    memo.set(key, true);
                    return true;
                }
            }
        }
        memo.set(key, false);
        return false;
    };

    return wins(piles);
};
