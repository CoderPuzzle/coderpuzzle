# Solutions — Maximize Score After Pair Deletions

Every operation peels a pair of elements off the two ends, so the score is
fully determined by the elements left behind — and which elements those can
be is tightly constrained.

## Keep the cheapest remaining block

Each operation removes two elements, one from the left or right end, and
scores their sum. After `floor((n - 1) / 2)` operations exactly
`n - 2 · floor((n - 1) / 2)` elements remain, so the survivor is a single
element when `n` is odd and two adjacent elements when `n` is even. Because
the removed pairs are always peeled from the ends, the elements that stay are
always a contiguous block of that size, and every element outside it is
removed exactly once.

Every removed element therefore contributes its value to the score, so the
score is the array total minus the sum of the surviving block. Maximizing the
score means leaving the cheapest possible block: the single minimum element
when `n` is odd, or the adjacent pair with the minimum sum when `n` is even.
The answer is computed in one pass — accumulate the total while tracking the
minimum element and the minimum adjacent-pair sum — and both candidate
blocks are valid regardless of where they sit, since operations can peel in
from either side to isolate any chosen block. A 64-bit return is required
because `n` elements of value `10⁴` can total `10⁹` when `n = 10⁵`, with
answers up to `10⁹`.

**Complexity:** `O(n)` time, `O(1)` space.
