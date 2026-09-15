// Game-tree DP: the mover with no stones left to take loses, and a
// position is won exactly when some move — pick a pile, reduce it —
// strands the opponent on a lost position. Memoize on the sorted pile
// vector: pile order never changes the move options, so every distinct
// position is decided exactly once.
function nimGame(piles: number[]): boolean {
    const memo = new Map<string, boolean>();

    const wins = (raw: number[]): boolean => {
        const state = [...raw].sort((a, b) => a - b);
        const key = state.join(",");
        const known = memo.get(key);
        if (known !== undefined) return known;
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
}
