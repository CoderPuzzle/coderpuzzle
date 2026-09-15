# Solutions — Partition Array According to Given Pivot

This is a Dutch-national-flag rearrangement with a stability twist: the three
class blocks must come out in less / equal / greater order, and within the
less and greater blocks the elements must keep their original relative order.

## Stable three-way partition

Walk `nums` once and append each element to one of three lists — `less`,
`equal`, or `greater` — then concatenate them. Because appending in scan order
is precisely "keep the order they occur in", the stability requirement inside
the less and greater groups holds by construction, and the concatenation lays
out the three blocks in the required sequence.

The statement guarantees `pivot` equals some element of `nums`, so the equal
list is never a guess — every input really does contain the middle block.
Values stay within ±10⁶ and only ever get copied, never combined, so a plain
32-bit element type is enough in every language; the output has exactly as
many elements as the input, making the result `n` slots of extra space.

One pass to classify plus one pass to concatenate touches each element a
constant number of times — there is no sorting and no re-scanning, unlike a
sort-by-class formulation which would pay `O(n log n)` for the same stable
outcome.

**Complexity:** `O(n)` time, `O(n)` space.
