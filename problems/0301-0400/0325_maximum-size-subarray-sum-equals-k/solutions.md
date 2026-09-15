# Solutions — Maximum Size Subarray Sum Equals k

Every contiguous stretch is the gap between two running totals: the slice
`(j, i]` adds up to `k` precisely when `acc(i) - acc(j) = k`. Both solutions
live inside that one identity, and both spend their effort pairing positions
whose totals differ by exactly `k` — but they organize the pairing
differently. One splits the array in half recursively and pairs each
prefix of the right half against the suffixes of the left — divide and
conquer, in the manner of a merge sort, with a hash map per level instead
of a merge. The other sweeps left to right once, carrying a hash map of
totals already passed and asking, at every position, how far back the
complementary total first appeared.

## Divide and Conquer

Split the array at a midline. A subarray with sum `k` either lies wholly in
the left half, wholly in the right half, or crosses the midline — the first
two are the same problem on half the span, so only the crossing case needs
new machinery, exactly the division a merge sort performs.

A crossing subarray is a suffix of the left half glued to a prefix of the
right. Scan the left half from the midline outward, accumulating suffix
totals into a map from total to the _longest_ suffix carrying it — scanning
away from the mid and overwriting keeps the longest, the mirrored twin of
the first-occurrence rule below. Then scan the right half outward from the
midline, accumulating prefix totals; a prefix summing to `s` needs a left
suffix summing to exactly `k - s`, and the map answers with the longest
one, so the pair glued at the midline is the best crossing subarray for
that prefix. Example 3 spells it out: the top midline falls after
`4,-1,2`, the suffix sweep records `2 → 1`, `1 → 2`, `5 → 3`, and the
right prefix `1,-2` summing to `-1` demands `k - (-1) = 5` — supplied by
the whole left half, length `3 + 2 = 5`, the subarray `[4,-1,2,1,-2]`.

Subarrays hugging the midline on one side only are covered by the recursive
calls — a pure prefix of the right half is just a subarray of the right
half — so the crossing scan may assume both parts non-empty. Each level
does linear work in maps that vanish when the level returns, and the
recursion is `log n` deep. Mixed signs make every suffix total a live
candidate, which is why the map is keyed by value and not by position.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Prefix Sums with a First-Occurrence Hash Map

Every subarray sum is a difference of two prefix sums: the subarray `(j, i]` sums to `k` exactly when `acc(i) - acc(j) = k`, i.e. when the earlier prefix equals `acc(i) - k`. So the problem reduces to a single left-to-right sweep that, at each index, looks up whether the complementary prefix value has been seen and how long ago.

A running accumulator `acc` replaces any stored prefix array. A hash map `first` records the _earliest_ index at which each prefix value occurred, seeded with `{0: -1}` so a subarray starting at index 0 is found when `acc` itself equals `k`. Storing only the first occurrence is the maximization trick: among all valid left endpoints for the same prefix value, the earliest one yields the longest subarray `i - j`, so later duplicates are deliberately not overwritten.

At each index the lookup happens before the insertion, which keeps the length-0 subarray out of consideration (an element can pair only with strictly earlier prefixes). `best` tracks the maximum `i - j` seen, initialized to 0 so a `k` that never appears returns 0, as specified.

The map can hold up to `n + 1` distinct prefix values — negative numbers guarantee plenty of variety — and each step is one addition, one hash lookup, and at most one insert. Edge cases like the whole array summing to `k` (handled by the `{0: -1}` seed) and mixed-sign inputs fall out of the same arithmetic with no special handling.

**Complexity:** `O(n)` time, `O(n)` space.
