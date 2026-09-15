# Solutions — Duplicate Zeros

## Two-pointer write from the end

Every zero that lands inside the array needs a duplicate, so the final
array has `zeros` extra elements that were not present originally. The
trick is to work backwards: a right-to-left pass never overwrites a
value that still has to be read, because every element is written to a
position at or to the right of its source. Two pointers drive the pass —
`i` reads from the end of the original array and `j` writes into the
(conceptually) extended array, starting `zeros` positions further right.
Only writes with `j` inside the real array length take effect; the rest
fall off the end, exactly as the statement requires.

When the current element is a zero, the pass writes it twice, first the
element then the duplicate, so two adjacent zeros appear wherever the
original zero survives. The source pointer advances one step regardless,
and the loop ends when every original element has been consumed — the
in-place mutation is complete and the array is returned.

**Complexity:** `O(n)` time — each element is read once and written at
most twice — and `O(1)` extra space, using only the two pointers.
