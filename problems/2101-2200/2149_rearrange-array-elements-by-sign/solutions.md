# Solutions — Rearrange Array Elements by Sign

Alternating signs starting with a positive pin down every slot: even indices
receive positives and odd indices negatives. Since each sign must also preserve
its original relative order, the k-th positive belongs at index `2k` and the
k-th negative at `2k + 1` — the conditions admit exactly one arrangement.

## Scatter each sign onto its slots

Knowing each element's destination in advance removes any need to build the two
sign lists explicitly. One pass over `nums` keeps running counts of the
positives and negatives seen so far and writes the current value straight into
`2 * positives` or `2 * negatives + 1` of a preallocated result array; because
the input holds equally many of each sign, the two cursors never collide and
every slot is written exactly once.

On `[3,1,-2,-5,2,-4]` the positives land at slots 0, 2, 4 and the negatives at
1, 3, 5, yielding `[3,-2,1,-5,2,-4]`. The equal-count guarantee makes the
scatter total: `n` writes into an array of length `n`, with no reordering or
comparison anywhere.

**Complexity:** `O(n)` time, `O(n)` space for the result.
