# Solutions — Fixed Point

Both approaches answer the definition head-on — find the smallest index
whose element equals the index — over an array whose strict monotonicity
makes the gap `arr[i] - i` non-decreasing and a fixed point exactly a
zero of that gap. The linear scan reads left to right and stops at the
first agreement, spending none of that structure for an `O(n)` sweep.
The binary search cashes the gap in: bisection lands on the leftmost
index where it stops being negative, one final check confirms it is
actually zero there, and the cost drops to `O(log n)` — strictly better
at these bounds, so the search closes the file as the reference.

## Linear scan

The scan answers the definition directly: walk the positions left to
right, compare `arr[i]` with `i` at each one, and return the first index
that agrees — no later index can be smaller, so the first hit is exactly
the smallest match the statement asks for. A pass that runs off the end
without an agreement reports `-1`.

Nothing in the loop consults the ordering or the distinctness of the
values; the same code would find the leftmost fixed point of an
unsorted, duplicate-riddled array. That indifference is its simplicity
and its cost: every position up to the answer is examined, even when the
sorted gap has already ruled the rest of the array out — the work the
binary search below refuses to do.

**Complexity:** `O(n)` time, `O(1)` space.

## Binary search on arr[i] - i

Because `arr` is strictly increasing (distinct values, ascending order),
consecutive elements differ by at least 1 while the index always advances
by exactly 1, so the sequence `arr[i] - i` is non-decreasing as `i` grows.
That monotonicity lets binary search hunt for the leftmost index where
`arr[i] - i >= 0`: whenever the midpoint's difference is negative, every
index at or before the midpoint is too small to be the answer, since the
difference only grows from there and can't reach zero behind it, so the
search moves past the midpoint; whenever the difference is `>= 0`, the
leftmost qualifying index is at or before the midpoint, so the search
keeps the midpoint as a candidate and narrows the right bound down to it.

The search converges on the smallest index whose `arr[i] - i` is `>= 0`,
but that index only counts as an answer if the difference is exactly `0`
there — the monotonic sequence can step from negative straight past zero
to positive between consecutive indices without ever landing on zero, in
which case no fixed point exists at all. A final check on the converged
index distinguishes a true fixed point from that skip-over case and
produces `-1` when no fixed point is present.

**Complexity:** `O(log n)` time, `O(1)` space.
