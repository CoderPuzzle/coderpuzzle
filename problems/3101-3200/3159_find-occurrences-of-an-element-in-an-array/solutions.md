# Solutions — Find Occurrences of an Element in an Array

Answering each query by re-scanning `nums` costs `O(n)` per query and
`O(n · q)` overall — wasteful because every query asks about the same
element `x`, merely a different occurrence rank. One pass fixes that:
the positions where `x` appears, recorded in index order, form a lookup
table indexed by rank.

## Collect positions once, answer by rank

The sweep stores every index holding `x` into a list; position `i` in
that list is the `(i+1)`-th occurrence. Each query `k` becomes a single
comparison and one read — `positions[k - 1]` when the rank exists, `-1`
when it overruns the end of the table. Query work drops to constant
time, so total cost is dominated by the single scan of `nums`; queries
may be answered in arrival order with no sorting or grouping.

Correctness rests on two details: ranks are 1-based while the recorded
table is 0-based (hence `k - 1`), and overrun means strictly greater
than the table length, so a query equal to the exact count returns the
last valid index rather than `-1`. All values fit comfortably in 32-bit
integers (`nums.length <= 10⁵`).

**Complexity:** `O(n + q)` time, `O(n)` space.
