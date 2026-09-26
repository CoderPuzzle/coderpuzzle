# Solutions — Array Upper Bound

## Binary Search for the Rightmost Occurrence

The enhancement installs `upperBound` on `Array.prototype` as a
hi-converging binary search. Two pointers bracket the answer with the
invariant that everything left of `lo` is `<= target` and everything from
`hi` onward is `> target`. Each step probes the middle: a probe at or below
the target discards the whole left side (`lo = mid + 1`), anything greater
shrinks the right edge to it (`hi = mid`). The probed side is always safe
to drop because the array is sorted, so each comparison halves the range.

![On `nums = [3,4,6,6,6,6,7]` with `target = 6`, three mid probes discard indices `0-3`, then `4-5`, then `6`, and the pointers meet at `lo = hi = 6`, so the last occurrence is `lo - 1 = 5`.](figures/solution-rightmost-binary-search.svg)

When the pointers meet, `lo` is the first index past the target's run — the
position bisecting "right of every occurrence" — so the last occurrence is
`lo - 1`, reported only if `nums[lo - 1]` really equals the target and the
`-1` sentinel otherwise. That single final equality check settles every
edge without special cases: a target smaller than all elements leaves `lo`
at 0, one larger than all leaves the last-checked element unequal, and one
falling in a gap between elements stops `lo` on the first greater value —
each resolves to -1, while a genuine hit at index 0 still reports 0 because
equality, not truthiness, decides.

**Complexity:** `O(log n)` time, `O(1)` space.
