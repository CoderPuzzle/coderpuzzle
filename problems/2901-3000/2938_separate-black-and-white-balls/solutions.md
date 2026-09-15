# Solutions — Separate Black and White Balls

Sorting `s` into all-whites-then-all-blacks with adjacent swaps looks
like a search problem, but each swap's usefulness can be judged locally
and the whole minimum collapses into one counting pass.

## Count inversions in one sweep

Two balls of the same color never need to cross: any final segregated
arrangement keeps same-colored balls in their original relative order,
so a swap between equal colors can be removed from any solution without
changing where the different-colored balls end up. Every useful swap
therefore exchanges a `1` with a `0` sitting immediately to its right —
and each `(1, 0)` pair needs to happen exactly once: before that swap,
the black ball has a white ball somewhere to its right and is therefore
misplaced, and after it, the two never have reason to exchange again.
The minimum number of steps is exactly the number of pairs `(i, j)`
with `i < j`, `s[i] == '1'`, `s[j] == '0'` — the inversions of `s`.

That count falls out of a single right-to-left sweep: walk the string
from the end, keep a counter of how many `0`s have been seen, and every
time a `1` appears, add the counter — that `1` must cross every zero
currently to its right, and only those. The sweep touches each
character once with constant work, independent of how clustered the
colors are.

On widths, the count is quadratic in the worst case: with `n = 10⁵`
split into two halves it reaches `(5·10⁴)² = 2.5·10⁹`, which overflows
signed 32-bit — so the accumulator and the return value are 64-bit
(`long long` / `long` / `int64` / `i64`). JavaScript's `Number` holds
the same maximum exactly, staying far below the 2⁵³ exactness limit.

**Complexity:** `O(n)` time, `O(1)` space.
