# Solutions — Number of Equivalent Domino Pairs

## Canonical key in a 9×9 table, counted as you go

Rotation equivalence disappears the moment each domino is written in a
canonical orientation: the pair `(min(a, b), max(a, b))` is identical for a
domino and its rotation, so two dominoes are equivalent exactly when their
canonical pairs are equal. Since both halves lie in `1..9`, the canonical
pair is a cell of a 9×9 count table — no hash map needed.

Walking the list once, the table entry for the current domino's key holds
the number of earlier dominoes equivalent to it, which is precisely the
number of new pairs `(i, j)` this element closes; add it to the answer,
then increment the entry. The total is therefore the sum of
`C(c, 2)` over all equivalence classes, accumulated incrementally.

The answer can reach `C(4·10⁴, 2) ≈ 8·10⁸`, still inside 32-bit range but
close to its edge, so the running total is kept in a 64-bit accumulator
where the language makes that distinction.

**Complexity:** `O(n)` time — one pass with `O(1)` work per domino — and
`O(1)` space, the 81-cell table.
