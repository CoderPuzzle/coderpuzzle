# Solutions — Sort By

## Decorate Once, Sort an Index Permutation, Undecorate

Calling `fn` inside the sort comparator re-evaluates it at every
comparison, O(n log n) calls on a typical run. Instead, decorate first:
walk the array once and record each element's key, calling `fn` exactly n
times. Then sort a permutation of the original indices with the numeric
comparator `keys[i] - keys[j]`, breaking ties by original index so equal
keys can never swap places — the order is stable by construction rather
than by trusting engine-specific sort internals. Finally undecorate: walk
the sorted permutation and gather the elements it points back to.

Two contract details close the edges. The problem guarantees fn never
returns duplicate numbers for a given array, so in-contract inputs never
hit the tiebreak at all; keeping it merely makes stability unconditional.
And because keys are numbers produced by subtraction-ready arithmetic,
`keys[i] - keys[j]` is exactly the "is a before b" oracle ascending order
needs — no string coercion, no comparator contract pitfalls. Elements are
never copied or rearranged mid-sort; only lightweight integers move, and
the last pass collects references into the result.

**Complexity:** `O(n log n)` time (n key applications plus an n log n
index sort), `O(n)` space for the keys, permutation, and result.
