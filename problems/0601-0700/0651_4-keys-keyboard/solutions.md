# Solutions — 4 Keys Keyboard

## Press table with the best capture point

Let `best[i]` be the most 'A's that `i` presses can leave on screen. The press
that lands last does one of two jobs: it prints a lone `A` on top of
`best[i - 1]`, or it is the final paste after a Ctrl-A / Ctrl-C pair taken at
press `j`. The pair spends two presses capturing the screen exactly as it
stood at press `j` — capturing all of it is never worse than capturing part —
and each of the remaining `i - j - 2` presses appends the captured block once
more, so the screen ends at `best[j] * (i - j - 1)`: the copy already there
plus one per paste. That gives
`best[i] = max(best[i - 1] + 1, best[j] * (i - j - 1))` over `j <= i - 3`,
since a pair with no paste after it earns nothing.

Scanning `j` is also what lets pairs compose. The best capture point may sit
at the top of an earlier pair's paste chain, because `best[j]` has already
priced that chain in, so the table finds multi-ply sequences without ever
enumerating key sequences. The domain's shape falls out cleanly: through
`n = 6` a pair can never pay for its two presses, so the answer is simply
`n`; at `n = 7` three A's followed by a pair and two pastes take the lead at
`9 = 3 × 3` (the second example); from there the answers are products of 3s
and 4s — `n = 9` reaches `4 × 4 = 16`, `n = 11` reaches `3 × 3 × 3 = 27`
across two pairs, and `n = 50` tops out at 1,327,104.

The two loops fill one press count at a time and reuse every smaller entry
freely; the single table is the only storage. Every candidate formed along the
way is itself an attainable final screen, so the whole computation stays at or
below `best[50] = 1,327,104`, far inside 32-bit range in every fixed-width
language and exact in JavaScript's doubles, which hold integers exactly to
`2⁵³`. At `n <= 50` the fill tries barely more than a thousand candidate
products.

**Complexity:** `O(n²)` time, `O(n)` space.
