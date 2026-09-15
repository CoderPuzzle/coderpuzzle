# Solutions — Make Two Arrays Equal by Reversing Subarrays

## Multiset equality via counting

Subarray reversals generate every permutation of `arr` — a reversal of
length 2 swaps neighbors, and adjacent swaps generate the full symmetric
group — so `arr` can reach `target` exactly when the two arrays hold the
same multiset of values. Order is irrelevant; only multiplicities matter.

With values bounded by 1000 the cheapest multiset is a 1001-slot count
array: increment for each `target` element, decrement for each `arr`
element, and the arrays are reorderings of each other precisely when
every slot ends at zero. (A sort of both arrays, or a hash map of
counts, answers the same question with the same verdict.)

One pass over each array plus one scan of the slots is linear in the
input and constant in extra structure.

**Complexity:** `O(n + V)` time for `n` elements and value bound `V`,
`O(V)` space.
