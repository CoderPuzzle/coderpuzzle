# Rank Transform of an Array

## Approach: Sort distinct values, map to positions

A value's rank is its position in the sorted order of distinct values,
numbered from 1 — duplicates share a rank and ranks stay contiguous. So
the distinct values are collected, sorted once, and each is recorded at
its position in a value-to-rank map; a final walk over the original array
replaces every element by its mapped rank, preserving the input order.

Sorting distinct values rather than the array itself both shrinks the sort
and states the deduplication explicitly; the original positions survive in
the output because the map is consulted in input order.

**Complexity:** O(n log n) time, O(n) space.
