# Solutions — Merge Sorted Array

## Three pointers, filling from the back

Merging forward is awkward here: the answer has to end up inside `nums1` itself, and writing smallest-first at the front would overwrite `nums1` elements that have not been read yet, unless a second buffer or a shifting pass is paid for. Filling backward removes the hazard entirely — the last `n` slots of `nums1` are declared scratch, so the destination of the very first write, index `m + n - 1`, is guaranteed free, and every later write only moves further down into space that is either scratch or already-consumed input.

Three cursors run the merge: `i` walks the real prefix of `nums1` from its last element down, `j` walks `nums2` the same way, and `write` marks the next free slot from the back. Each step compares the two candidates and copies the larger one to `nums1[write]`; on a tie the element comes from `nums2`, which keeps the choice deterministic. Whichever side was consumed, its cursor and `write` each step down one, so the invariant is that `nums1[write + 1 ..]` always holds the sorted tail of the merged result.

The loop stops as soon as `j` runs past the start of `nums2`: whatever is left unread in `nums1`'s prefix is already the sorted head of the answer, sitting exactly where it belongs. At the extremes `m = 0` copies all of `nums2` wholesale, `n = 0` leaves `nums1` untouched, and every element is written at most once. The method then returns `nums1`, the merged array the judge compares exactly.

**Complexity:** `O(m + n)` time, `O(1)` extra space.
