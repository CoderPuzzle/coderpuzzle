# Solutions — Append K Integers With Minimal Sum

## Consume gaps between sorted distinct values

The appended integers must be the `k` smallest positives absent from
`nums`. Sorting the distinct values lays out the forbidden numbers in
order; each gap between consecutive values is a run of consecutive
candidates whose sum is an arithmetic series, so walk the gaps taking as
many as `k` still needs, and spill any remainder into the consecutive run
just past the last value. Duplicates collapse before the walk, which also
makes each gap's arithmetic-series sum exact.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space.
