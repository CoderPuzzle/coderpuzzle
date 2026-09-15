# Solutions — String Compression II

## Index-and-budget DP with an inline run scan

The state is `dp(i, k)`: the minimum encoded length achievable for the
suffix `s[i:]` given `k` deletions still to spend. Two moves are
available at each state. The first simply deletes `s[i]` and recurses
into `dp(i + 1, k - 1)`, paying nothing toward the encoded length. The
second commits to keeping a run of `s[i]`'s character starting at `i`:
scan forward from `i`, tallying how many characters equal `s[i]`
(`same`) versus how many don't (`diff`, each one a forced deletion if
this run is to stay contiguous). For every prefix of that scan where
`diff` has not yet exceeded the remaining budget `k`, one candidate is
`encodedLength(same) + dp(j + 1, k - diff)`, where `j` is the scan
position and `encodedLength` counts how many characters the run itself
contributes to the compressed output. The answer is `dp(0, k)`, the
better of the two moves minimized over every valid run-length choice.

`encodedLength(count)` is the run-length-contribution rule spelled out
by the problem: `0` for a run of `0` (nothing kept), `1` character for a
run of length `1` (no digit is written), `2` for lengths `2`–`9` (one
digit), `3` for lengths `10`–`99` (two digits), and `4` for the single
possible length of `100` (three digits, only reachable when `s` itself
has length `100`). A state where the remaining suffix is no longer than
the remaining budget short-circuits to `0`, since every leftover
character can simply be deleted. Memoizing on `(i, k)` — both bounded by
`s.length` — keeps every state's inner scan the only unmemoized work,
and revisits are eliminated entirely.

**Complexity:** `O(n^2 * k)` time — `O(n * k)` memoized states, each
scanning up to `O(n)` characters forward — and `O(n * k)` space for the
memo.
