# Solutions — 3Sum Closest

## Sort and two pointers

The brute force checks all `n choose 3` triples, but almost all of that work is ordered repetition: the statement only asks for a sum, never for the indices that produced it, so permuting the same three values is the same answer. Sorting makes that redundancy visible as geometry — with the array in order, the space of sums is bounded, for any fixed anchor value, by the smallest and largest values still unpaired. One anchor plus a low and a high pointer walking inward can then sweep every distinct sum region in linear time per anchor.

The method sorts `nums`, then for each anchor index `i` scans `lo` upward from `i + 1` and `hi` downward from the end. Each `total` is compared against the best `closest` so far, keeping only strict improvements — the seed is the sum of the three smallest values, a genuine candidate like any other. An exact hit on `target` returns immediately, since distance zero cannot be beaten by anything left to examine. Duplicates and negative values need no special handling at all: the scan never skips or dedupes, it just measures distances.

Moving exactly one pointer per miss is the step that keeps the sweep honest. When `total` falls short of `target`, sorted order guarantees that pairing the same `lo` with any smaller `hi` lands even further below, so `lo` itself is the spent index and it steps up; symmetrically, an overshoot retires `hi`. Every remaining pair stays reachable by the one move that could improve on the current total, which is why the walk can discard the rest without a second thought.

**Complexity:** `O(n²)` time, `O(n)` space.
