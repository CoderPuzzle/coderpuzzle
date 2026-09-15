# Solutions — Apply Operations to an Array

## Simulate, then shift zeros

The operations only ever zero out a right neighbor when two adjacent
elements are equal, so phase one is a single left-to-right pass: compare
`nums[i]` with `nums[i + 1]`, and when they match double the left element
and zero the right one. Because the operations are applied sequentially, the
comparison at the next step sees the freshly-zeroed value — a doubled
element is never revisited, but its zeroed neighbor may participate in the
very next comparison.

Phase two moves every zero to the end while preserving the order of the
non-zero values. A write pointer walks the array and copies each non-zero
element to the front, skipping zeros; when the pass finishes, the remaining
slots are padded with zeros. This is exactly the "shift all the 0's to the
end" from the statement, stable by construction.

Both phases run on a copy of the input so the caller's array is never
disturbed (the judge re-reads it). Doubling at most once per element keeps
every value below `2001`, comfortably inside 32-bit integers in all seven
languages.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output.
