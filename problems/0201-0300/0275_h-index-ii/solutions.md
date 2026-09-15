# Solutions — H-Index II

## Binary search on the sorted array

Sorting does the counting. Because `citations` never decreases, the papers
from any index `i` to the end — exactly `n - i` of them — all hold
`citations[i]` or more, so the test `citations[i] >= n - i` asks precisely
whether `h = n - i` is achievable. The test can only flip one way along the
array: moving `i` right can raise the left side and strictly lowers the
right, so it reads false ... false, true ... true, and the leftmost true
gives the largest achievable `h` as `n - i` there. The statement's
logarithmic-time mandate rules out the linear walk that solves the unsorted
H-Index; the sorted input is exactly what the bisection is for.

The search bisects the half-open window `[0, n]` over indices, not values. A
probe whose count falls short of `n - mid` cannot be the boundary, and no
smaller index can either — the left side only shrinks going left — so `lo`
moves past it; a probe that qualifies is itself a witness, so the window
keeps `[lo, mid]`. Halving continues until one index remains, the leftmost
qualifying one, and the answer is `n - lo`.

Both extremes fall out without special cases. When every paper qualifies —
`[5, 5, 5]`, or any array with `citations[0] >= n` — the leftmost true is
index 0 and `h = n`. When nothing qualifies, which for non-negative citation
counts means an all-zero array, the window collapses to `lo = n` and
`n - lo` is 0. The index arithmetic never leaves `[0, n]` with `n <= 10⁵`,
so plain midpoint sums stay safely in range.

**Complexity:** `O(log n)` time, `O(1)` space.
