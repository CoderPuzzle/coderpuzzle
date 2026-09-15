# Solutions — Two Sum II - Input Array Is Sorted

Two searches that both pay with the ordering instead of memory. One asks
each position a single question — is your partner in the sorted remainder?
— and lets bisection answer it; the other visits the array once, retiring
an endpoint at each end with two converging markers. Neither remembers
anything but a few indices.

## Binary Search

The same guarantee reads differently from one position's point of view. Take a
position `i`; the partner it needs is the exact value `target - numbers[i]`, and
that partner — if it exists — must live among the positions after `i`, because
a position cannot pair with itself and reporting the smaller position first
makes `i` the left half of the pair. That remainder `numbers[i+1..]` is sorted, so
one bisection either finds the partner or proves it absent. March `i` across
the array and the promised pair must be found: the search stops at the first
position whose complement is present.

Bisection inside a sorted range keeps two bounds, `lo` and `hi`, and halves the
distance between them per comparison; a hit inside `numbers[i+1..]` is reported as
the one-based pair `[i + 1, mid + 1]`. Duplicates cost nothing: the range
sought is a value, and `numbers[i+1..]` being non-decreasing means any cell
holding that value answers — Example 3's two `4`s are adjacent, so the scan at
`i = 0` finds the second one immediately. The loop bound `i + 1 < n` leaves the
final position unexamined, which is correct because it has no legal partner
left.

The price of the per-position question is logarithmic: each of at most `n`
positions pays one bisection of at most `log n` comparisons, against the
single linear sweep of the two-marker method. What both hold to is the problem's
real demand — the state is a handful of indices, and nothing grows with `n`.

**Complexity:** `O(n log n)` time, `O(1)` space.

## Converging Two Pointers

Sorted order lets two pointers start at the ends and close in. If the current pair sums below the target, the left value is finished: pairing it with anything smaller than the current right element would only lower the sum further, so no unseen partner can rescue it and the left pointer advances. Symmetrically, a sum above the target retires the right value, since pairing it with anything larger than the current left element only raises the sum.

Each step therefore discards one element with a proof that it cannot belong to the answer pair, and the window shrinks by one until the surviving pair sums exactly to the target. Because the tests guarantee exactly one solution, the pointers cannot skip past it — every discarded element is certified irrelevant before it leaves the window — and the loop returns the two positions incremented to the 1-based indices the problem expects.

Compared with the hash-map approach, the sorted structure replaces O(n) auxiliary memory with two integer indices, satisfying the constant-space requirement; the fallback empty return is unreachable under the uniqueness promise but keeps the function total.

**Complexity:** `O(n)` time, `O(1)` space.
