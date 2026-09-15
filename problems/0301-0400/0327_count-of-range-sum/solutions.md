# Solutions — Count of Range Sum

Write every subarray total as a prefix difference and the count becomes:
index pairs `i < j` with `prefix[j] - prefix[i] ∈ [lower, upper]`, over a
prefix array of length `n + 1` that opens with a 0. Both solutions count
exactly those pairs; neither inspects subarrays at all. What differs is the
bookkeeping that makes each right-hand prefix find its legal left partners.
One sorts the prefixes by halving — merge sort's recursion counts cross
pairs while both halves sit sorted. The other never sorts: it sweeps the
prefixes once, left to right, dropping each into a Fenwick tree keyed by
value, so that every arrival can ask the tree how many of its predecessors
land in the wanted window.

## Merge-Sort Divide and Conquer over Prefix Sums

Rewriting each range sum as a difference of prefixes turns the problem into counting index pairs `i < j` with `prefix[j] - prefix[i] ∈ [lower, upper]` (using a prefix array of length `n + 1` with a leading 0). A divide-and-conquer merge sort counts exactly the pairs whose endpoints land in different halves: recursively count pairs within the left half, within the right half, then count cross pairs while both halves are momentarily sorted.

The cross-counting step exploits the left half being sorted. For each left value `prefix[i]`, two pointers sweep the right half: `l` advances past all values whose difference is below `lower`, and `r` advances past all values whose difference is at most `upper`. The window `[l, r)` contains exactly the right-half entries pairing validly with `prefix[i]`, and both pointers only ever move forward — monotone because consecutive left values are non-decreasing — so the sweep costs linear time per merge rather than a nested search.

After counting, the standard stable merge of the two halves sorts the combined range, restoring the invariant the parent level relies on. The recursion bottoms out at single-element ranges contributing nothing. Python's integers are arbitrary precision, so the potentially 32-bit-overflowing prefix differences hinted at for other languages are a non-issue here.

The pair structure is why naive approaches fail: there are quadratically many `(i, j)` pairs (10⁵ elements → ~5 · 10⁹ pairs), but the divide and conquer visits each element `O(log n)` times, one count pass and one merge pass per level. Single-element arrays are counted correctly — the empty prefix 0 pairs with the sole element when its value lies in range.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Fenwick Tree

No recursion, no sorting of halves — just one pass and a counting structure.
The prefix values span up to roughly ±2⁴⁶, far too wide for a direct array,
so they are first coordinate-compressed: the sorted, de-duplicated list of
all `n + 1` prefix values assigns each a rank, and a Fenwick (binary
indexed) tree over those ranks can add 1 at a rank and report how many
inserted values sit at or below any rank — both in a handful of steps,
walking the index's lowest set bit up or down.

The sweep then reads like the definition. Insert `prefix[0] = 0` (a
subarray starting at index 0 must be countable), and for each `j = 1..n`,
standing at `prefix[j] = p`: an earlier prefix `e` forms a qualifying pair
exactly when `e ∈ [p - upper, p - lower]`. Two rank lookups turn that
interval into a count — everything at most `p - lower`, minus everything
below `p - upper` — after which `p` itself is inserted and the next
position takes its turn. Querying before inserting is what enforces `i < j`
without any index comparisons: a prefix is simply not in the tree when its
own turn comes. On `[3,-4,2]` against `[-1, 4]`, the arrivals `3`, `-1`,
`1` query the windows `[-1, 4]`, `[-5, 0]`, `[-3, 2]` against the
predecessors `{0}`, `{0, 3}`, `{0, 3, -1}` and collect 1 + 1 + 2.

The compression pass costs a sort — the same `O(n log n)` the merges
spend — and each of the `n + 1` prefixes then costs two queries and one
insert, each a logarithmic number of tree hops. 32-bit-scale elements make
the prefix differences overflow 32-bit arithmetic in the fixed-width
languages, so the sums travel in wider types there, exactly as the hints
warn.

**Complexity:** `O(n log n)` time, `O(n)` space.
