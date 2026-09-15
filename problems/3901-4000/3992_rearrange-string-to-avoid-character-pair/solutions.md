# Solutions — Rearrange String to Avoid Character Pair

## Directional sort

Sorting groups equal letters, so all occurrences of `x` and all occurrences of
`y` each collapse into a single contiguous block. Sorting ascending places the
alphabetically smaller letter's block first; sorting descending does the
reverse. So the single decision is the direction: sort ascending when
`x > y`, descending when `x < y` — either way every `y` ends up left of every
`x`, and `x != y` guarantees the two letters never share a block. Characters
other than `x` and `y` may land anywhere; they cannot violate the condition.

A letter absent from `s` simply has no block, and the condition holds
vacuously for it. The result is a permutation of `s` by construction.

**Complexity:** `O(n log n)` time for the sort and `O(n)` space, with
`n <= 100`.
