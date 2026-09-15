# Solutions — Compute Alternating Sum

## Pairwise stride-two walk

The definition already spells out the algorithm: sweep the indices left to
right once and let parity decide whether each element joins the total with a
plus or a minus. Stepping two positions at a time turns that parity decision
into pure structure — the walk lands only on even indices, adds each element
it lands on, and subtracts the very next element, which is exactly the
odd-index term of that pair. When the length is odd the final even-index
element has no right-hand partner, so nothing is subtracted and the lone
element simply closes the total.

The bounds keep the arithmetic small: with at most 100 elements none larger
than 100, the answer cannot leave the range [-5000, 5000], well inside
32-bit signed range. The running total may sit below zero partway through
the walk before recovering — ordinary signed arithmetic absorbs that without
any special handling, and a single-element array degenerates to returning
its one element unchanged.

**Complexity:** `O(n)` time, `O(1)` space.
