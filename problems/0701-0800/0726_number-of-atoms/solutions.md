# Solutions — Number of Atoms

A formula is built from only three moves — an element name with an optional
count, concatenation, and a parenthesized group with an optional multiplier —
so the whole task is one left-to-right scan that keeps a count map per open
group. An explicit stack of maps makes the nesting concrete without any
recursion, and the answer is the bottom map written out in sorted name order.

## Stack of count maps

Scan the formula once. `'('` pushes a fresh map; an element name — one
uppercase letter plus any run of lowercase — lands its count in the top map,
reading the digits after the name as the count and a missing count as 1.
`')'` pops the top map, reads the optional trailing multiplier the same way,
and folds every atom in the group into the parent map scaled by it. Folding
at the moment a group closes is what makes the messy cases fall out for
free: an element repeated across sibling groups or across nesting levels
simply sums in the parent, and nested multipliers compound as plain repeated
multiplication — counts ride in 64-bit integers so even deep compounding
cannot pinch on the way to totals the statement bounds by 32 bits.

When the scan ends, exactly the bottom map remains, holding one total per
distinct element. Sorting its names and appending each count unless it is
exactly 1 gives the answer; lexicographic order over names is plain byte
order, which already puts `B` before `Ba` before `Be`.

**Complexity:** `O(n log n)` time, `O(n)` space.
