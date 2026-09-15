# Solutions — First Bad Version

## Binary search

The version line is monotone: every version before the hidden boundary passes
the quality check and every version from it on fails, so `isBadVersion`
answers false, false, …, false, true, true along `[1, n]`. Finding the first
bad version is therefore finding the first true of a sorted predicate, the
exact shape binary search exists for. A linear walk answers too, but it spends
one call per version — up to `2³¹ - 1` of them — while the API is the only
expensive thing in the problem and the statement asks for the calls to be
minimized.

Bisect the inclusive range `[lo, hi] = [1, n]`: probe the midpoint, and a bad
answer means the first bad version sits at `mid` or earlier (`hi = mid`), a
good one means it sits strictly after (`lo = mid + 1`). The loop stops when
the range collapses to a single index, which is the boundary itself — no
final re-check needed. Each probe discards half the remaining range, so even
the largest allowed `n` costs 31 calls.

The midpoint deserves its own care: `lo + (hi - lo) / 2` rather than
`(lo + hi) / 2`. On the full `[1, 2147483647]` range the sum `lo + hi`
overflows a signed 32-bit integer, wraps negative, and the search wanders off
the version line — the classic trap this problem exists to teach. The
difference form never exceeds `hi`, so it is safe at every width.

**Complexity:** `O(log n)` calls to `isBadVersion`, `O(1)` space.
