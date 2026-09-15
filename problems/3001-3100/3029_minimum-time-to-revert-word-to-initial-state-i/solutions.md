# Solutions — Minimum Time to Revert Word to Initial State I

## Survivor-prefix scan

Track what the operation actually destroys. Removals always take `k`
characters from the front while additions land at the back, and as long as
any original character survives, a removal can only consume originals —
added characters sit behind them in the queue. So after `t` seconds exactly
`t * k` original characters are gone, the survivors are the last
`n - t*k` characters of the original word, and they still occupy the front
of the current word, followed by freely chosen filler. Reverting at time
`t` is therefore possible exactly when the surviving suffix `word[t*k:]`
is itself a prefix of `word`: then everything removed can be re-added,
block by block, spelling the missing tail `word[n - t*k:]` across the `t`
additions. Once `t * k >= n` nothing survives at all and any word can be
typed back, which is why `t = ceil(n / k)` always works.

The code scans `t = 1, 2, ...` and returns the first `t` where
`t * k >= n` or `word[:n - t*k] == word[t*k:]`. Each check is a direct
prefix-versus-suffix comparison, and termination is guaranteed because
`t = ceil(n / k)` satisfies the first clause.

**Complexity:** `O(n²)` time, `O(n)` space.
