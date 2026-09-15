# Solutions — Count of Smaller Numbers After Self

Both solutions turn the quadratic pair scan into logarithmic bookkeeping:
every crossing pair — a position and a strictly smaller value after it — is
counted exactly once. The merge sort earns that by reorganizing: as
positions sort by value, each left-half element is credited the right-half
values placed before it, so the answers fall out of the merge itself. The
Fenwick tree keeps the array in place instead and walks it from the right
end, asking each element's question directly — how many seen values are
strictly below mine? — a rank query the bounded value range turns into a
prefix sum.

## Merge-Sort Divide-and-Conquer Counting

The divide-and-conquer reading sorts an array of positions keyed by their
values — positions, because the answer is one count per position and
sorting bare values would erase it. Merge sort halves the array, and the
halving is itself the bookkeeping device: every index in the right half
sits after every index in the left half, so a left element's
smaller-to-the-right count decomposes into what its own half contributes —
recursion's business — plus the right-half values strictly below it, which
the merge step reads off for free because both halves are already sorted
when it runs.

The tally rides on the merge cursor. When a left-half element is placed,
every right-half element already written out compared smaller against it —
the left run is sorted, so anything that outranked an earlier head also
outranks this one — and `result[position] += j - mid` credits them all at
once, `j - mid` being the count of right-half placements so far. The
comparison is `<=`: on equal values the left element places first, so an
equal right-hand value is never counted against it, which is precisely the
statement's "equal is not smaller" rule. A drain loop after the main sweep
credits any remaining left elements with the entire right half. Each
crossing pair is weighed at the one merge whose divide separates it —
never before, never again — so nothing is missed or double-counted.

Recursion depth is the sort's height — about seventeen frames at
`n = 10⁵` — and the left-half copy plus the position workspace are the
only extra storage. For `[-2, -2, 7, -5, 0]` the equal `-2`s place
left-first at every merge they share, so each reports only `-5` below it,
agreeing with the Fenwick tree's `[1, 1, 2, 0, 0]`.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Fenwick Tree over the Value Range

Scanning right to left turns the question inside out: when the walker reaches `nums[i]`, everything already processed lies to its right, so `counts[i]` is simply "how many already-inserted values are strictly smaller than `nums[i]`". That is a rank query, which a Fenwick tree (binary indexed tree) answers in logarithmic time.

The values are bounded in `[-10⁴, 10⁴]`, so instead of compressing coordinates the solution maps each value to a positive 1-based index with `value + 10002` (shifting the minimum to 2), and allocates a BIT sized to the whole 20005-slot value range. Each slot conceptually counts how many times its value has been inserted. For each element the code queries `query(index - 1)` — the prefix count over all values strictly below it — then inserts the element with `update(index, 1)`. The insertion order (query first, insert after) is what keeps the element from counting itself.

Both BIT operations are the standard low-bit walks: `update` climbs `i += i & -i` adding the delta to every covering block, `query` descends `i -= i & -i` summing the disjoint blocks that tile the prefix. Because the results are produced right-to-left, the list is reversed before returning.

Equal values are counted correctly on both sides: duplicates are inserted and counted (the third example `[-1,-1]` yields `[0,0]` since equal is not smaller), and the strictly-smaller semantics come from querying the prefix ending just below the element's own index. With `n` up to 10⁵, the total work is `n` logarithmic operations over the fixed value range `V = 2 · 10⁴ + 5`, which fits comfortably.

**Complexity:** `O(n log V)` time, `O(V)` space.
