# Solutions — Digit Count in Range

Both walks dispose of the interval the same way: with `F(x)` denoting the
appearances of `d` among the integers `1..x`, the requested tally is `F(high)`
minus `F(low - 1)`, and all the work lives inside `F`. The digit DP gathers
`F` by traversing the digit positions of `x` under two flags, one holding it
tight against the bound and one marking that the number has begun, with a
memo absorbing the free suffixes the traversal keeps re-entering. The
per-position formula dispenses with the traversal: it asks each digit place
of `x` directly how many numbers up to `x` show `d` there and answers with
arithmetic alone.

## Digit DP With Tight and Leading-Zero States

The prefix total can be gathered instead of derived: walk the digit
positions of `x` and, at each, try every digit the bound still permits. Two
flags steer the walk. `tight` says every digit placed so far matches `x`'s,
which caps the current choice at `x`'s digit there; picking below the cap
frees the whole remaining suffix, picking it keeps the walk on the bound's
spine. `started` says a nonzero digit has been placed; until it flips, a
placed `0` is a leading zero, and since a written number begins at its
first nonzero digit, those positions count for nothing.

Each state returns a pair: how many suffix completions it admits, and how
many appearances of `d` those completions hold. Placing `d` at the current
position adds the completion count once more, because that position shows
`d` in every number below it; summed over the walk, this charges repeated
appearances inside one integer as many times as they occur. The spine of
tight states is a single path, but it keeps shedding the same free
suffixes, so non-tight states are memoized per `(position, started)` and
expanded once each. `d = 0` needs no clause of its own here, and the
all-zero completion, which is the number `0` itself, carries no
appearances; the walk tallies exactly the integers `1..x`.

**Complexity:** `O(10·log high)` time, `O(log high)` space.

## Digit Counting per Position

The answer is reduced to a prefix-count problem: define f(x) as the number of occurrences of digit d among the integers 1..x, so the range count is f(high) − f(low − 1). Only f needs real work, and it never iterates the range — it counts, for each digit position of x, how many numbers up to x have d at that position.

For a position i (from the most significant end), write x as high_part · 10^power + cur · 10^power + low_part, where cur is the digit at the position. The numbers with a smaller high part than x's can place anything at the lower positions, contributing high_part · power (or (high_part + 1) · power when cur > d, since the prefix equal to x's high part is also allowed with any low part). When cur == d, the prefix-equal case contributes only the suffixes up to low_part, an extra low_part + 1. When cur < d, the prefix-equal case contributes nothing. Summing over all positions counts every occurrence exactly once, including multiple occurrences of d inside the same integer.

The d = 0 branch is the careful part: leading zeros are not written, so the units position of single-digit numbers and any position where the high part is 0 are excluded. The code requires high_part ≥ 1, then for cur > 0 contributes high_part · power and for cur == 0 contributes (high_part − 1) · power + low_part + 1 — the −1 because a leading zero on the counted position is forbidden, forcing the effective prefix to start at 1. Both calls run in time proportional to the square of the digit length (each position does O(length) string slicing and conversion), which is microseconds for x ≤ 2·10^8.

**Complexity:** `O(log² high)` time, `O(log high)` space.
