# Solutions — Sort Array By Absolute Value

## Magnitude sort with signed tie-break

An element's final position is decided by two facts: its magnitude first, its
sign second. Sorting `nums` once with a comparator that orders by absolute
value and breaks equal magnitudes on the raw signed value therefore settles
every position in a single comparison sort, whatever library sort the language
runs underneath.

The tie-break is what makes the answer unique rather than merely valid.
Magnitude alone cannot separate `-4` from `4`: stable sorts would keep such a
pair in input order and unstable sorts may reorder it freely, so sorting by
absolute value alone could produce different arrays per language. Comparing
the signed values whenever magnitudes are equal places `-x` before `x`
always, independently of stability — and elements that compare fully equal
are identical, so the freedom that remains is invisible in the output.

Two practical notes hide in the comparator. In JavaScript and TypeScript the
default `sort()` compares elements as strings, which scrambles any mixed-sign
array (`"-10"` sorts before `"2"`), so the explicit numeric comparator
`Math.abs(a) - Math.abs(b) || a - b` is load-bearing. And while these bounds
keep `abs` safely inside fixed-width integers, values near `INT_MIN` would
overflow their own type under negation in C++/Java/Rust and need widening
first. The rearrangement runs in place and the same array is returned.

**Complexity:** `O(n log n)` time, `O(n)` space.
