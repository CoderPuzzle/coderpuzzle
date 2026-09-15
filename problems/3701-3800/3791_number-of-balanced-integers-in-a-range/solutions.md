# Solutions — Number of Balanced Integers in a Range

## Digit walk over a zero-padded alternating sum

Write `f(x)` for the number of balanced integers in `[1, x]`; the answer is
`f(high) - f(low - 1)`, so only a single-sided count is ever needed. The
pivot is a padding identity: pad every candidate `m <= x` with leading zeros
to the width `n` of `x`'s decimal form and sign each slot with `+` at odd
1-based positions and `-` at even ones. Leading zeros contribute nothing,
and shifting the real digits right by any amount only flips the whole
alternating sum's sign, so the padded sum is zero exactly when `m`'s
odd-position and even-position digit sums match. One walk over `x`'s digits
then counts every `m` in `[0, x]` whose padded sum vanishes. The two-digit
minimum mostly enforces itself — a lone leading digit `d` leaves a padded
sum of `±d`, never zero — and the single intruder `m = 0` (all zeros) is
subtracted once at the end.

The count itself is a classic tight digit walk over a suffix table.
`ways[i][t]` holds how many assignments of slots `i..n-1` with free digits
`0..9` have signed sum `t`; it is built right to left by summing each
state's ten successors. Walking `x`'s digits then goes slot by slot: a
chosen digit strictly below `x`'s own digit fixes a permanently smaller
prefix and contributes `ways[i + 1]` evaluated at the difference that
cancels the running sum, while following `x`'s digit exactly keeps the walk
tight. After the last slot, `x` itself counts when its full alternating sum
is zero.

With `high <= 10^15` there are at most `D = 16` digits and the running
difference stays inside `±9D`, so the table is `17 x 289` and both count
passes touch a few thousand states — let `S = 9D + 1` be the difference
span. The counts themselves reach `high + 1 <= 10^15 + 1`, past 32 bits, so
the fixed-width languages accumulate and return 64-bit integers; that same
bound sits far below `2^53`, so JavaScript numbers carry every count
exactly.

**Complexity:** `O(D * S)` time, `O(D * S)` space.
