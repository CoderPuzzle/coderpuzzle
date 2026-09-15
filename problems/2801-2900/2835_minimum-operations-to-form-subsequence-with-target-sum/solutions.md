# Solutions — Minimum Operations to Form Subsequence With Target Sum

## Greedy over power-of-two buckets, least-significant bit first

Splitting never changes the array sum, and a subsequence's sum can never
exceed the array sum, so `target > sum(nums)` is impossible. Conversely every
element value divides every larger one, so halves reassemble losslessly:
whenever the total covers target, each needed power of two can be carved out
of still-larger leftovers, which means an answer always exists in that case.
The problem therefore reduces to paying as few splits as possible while
carving out one piece per set bit of target.

Keep only a count per exponent, `count[b]` for elements equal to 2^b, and
walk target's bits from bit 0 to bit 30. When bit b is set, spend one unit of
`count[b]` if any exists. Otherwise find the smallest exponent j > b with a
remaining element, split it all the way down — that chain costs exactly
j − b operations, because each split removes one element and leaves two at
the level below, and the descent needs one split per level — banking the
idle twin left behind at every passed level plus the twin that lands on
level b itself, then spend that twin for the current bit. Regardless of how
the bit was served, floor-halve what remains at level b into level b + 1:
two leftover units standing side by side are interchangeable with one element
one level up, so they feed later bits for free. This lower-sources-first
discipline is safe because anything spent at level b could have been rebuilt
from promotions, whereas a coarser source split prematurely destroys capacity
finer bits might need; promoting before borrowing keeps every higher bit's
supply intact.

Serving a set bit either costs nothing or triggers at most one splitting
chain bounded by 31 levels, so the walk performs O(1) work per bit after an
O(n) counting pass, well inside the limits; counts and operation totals stay
tiny while only the running total needs wide integers, since it reaches
1000 · 2^30 ≈ 1.07 × 10^12, far beyond a signed 32-bit range.

**Complexity:** `O(n + b²)` time, `O(b)` space, where `b <= 31` is the bit width involved.
