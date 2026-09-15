# Solutions — Last Remaining Integer After Alternating Deletion Operations

## Iterative Elimination by Arithmetic Progression

After any full pass the survivors always form an arithmetic progression — start, start + step, start + 2·step, … — so the state (start, step, remaining, direction) fully describes the list and each pass is O(1) arithmetic instead of a walk over the numbers. A left-to-right pass keeps the first element, so start is unchanged; a right-to-left pass keeps the first element only when the count is odd, because with an even count the leftmost element is deleted from the right end's perspective — in that case the new progression begins one step higher, start += step. Either way, exactly half the elements (rounded up) survive, so remaining becomes (remaining + 1) // 2, step doubles, and the direction flips for the next pass.

The loop runs while more than one number remains and then reports start, which is the sole survivor. The rounding-up matters on odd counts: the middle element survives both pass orientations, and (remaining + 1) // 2 is what keeps the progression bookkeeping consistent with that.

With n up to 10^15, the list would be far too large to materialize, but halving per pass means the loop executes about 50 times — the same recurrence as the classic Josephus-style elimination game. The n = 1 edge case skips the loop entirely and returns 1.

**Complexity:** `O(log n)` time, `O(1)` space.
