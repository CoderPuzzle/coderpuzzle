# Solutions — Find the Distinct Difference Array

## Two running sets, opposite directions

Every `diff[i]` asks for two quantities: how many distinct values sit in the prefix `nums[0, ..., i]`, and how many sit in the suffix `nums[i + 1, ..., n - 1]`. A hash set answers "is this value already counted?" in constant time, so both questions can be settled with counters instead of rebuilding sets inside a nested scan.

The code first walks `nums` from right to left, keeping a set of everything seen so far. Before inserting each element it records the current set size into a `suffix_distinct` array, so after the pass `suffix_distinct[i]` holds the number of distinct elements strictly to the right of index `i`. The array is one slot longer than `nums`, which makes `suffix_distinct[n]` — the empty suffix past the last element — come out as 0 naturally.

A second pass walks left to right, growing a prefix set and emitting `prefix_seen.size - suffix_distinct[i + 1]`. Each contribution is monotone non-decreasing but the subtraction can go up or down, which is exactly the shape of the answer. Duplicates cost nothing extra: re-encountering a value leaves the relevant set unchanged, so the distinct counts only move when something genuinely new appears.

**Complexity:** `O(n)` time, `O(n)` space.
