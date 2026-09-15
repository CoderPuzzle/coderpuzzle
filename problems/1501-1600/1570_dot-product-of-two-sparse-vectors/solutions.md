# Solutions — Dot Product of Two Sparse Vectors

Sparseness is the whole contract: a vector of length `10⁵` may hold a
handful of nonzero entries, so each object keeps only those `(index,
value)` pairs (naturally sorted by index) and the product multiplies
just the positions where both vectors are nonzero. The dense `10⁵`-term
sum collapses to a merge over the two short lists.

## Sparse Index-Value Pairs with Two-Pointer Merge

Construction filters the input down to its nonzero `(index, value)`
pairs in one pass. Because both sides enumerate indices in increasing
order, `dotProduct` walks the two pair lists simultaneously with two
cursors: equal indices contribute one product and advance both cursors,
a smaller index advances alone — its partner at that position is zero,
so it contributes nothing. The answer accumulates only real overlaps,
so its cost tracks the nonzero counts `a` and `b`, never the full
length `n`.

The follow-up — only one vector sparse — is the same observation taken
further: walk the sparse side's pairs and index into the dense side's
plain array, `O(a)` with no merge at all. The product bound
`10⁵ · 100 · 100 = 10⁹` still fits a 32-bit signed integer, though
barely; wider accumulators are the safer habit when porting.

**Complexity:** `O(n)` construction, `O(a + b)` per product, `O(a)`
space per vector for `a` nonzero entries.
