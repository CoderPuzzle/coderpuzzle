# Solutions — Count Special Quadruplets

## Rewrite as pair sums and sweep the split point

The condition `nums[a] + nums[b] + nums[c] == nums[d]` with
`a < b < c < d` rearranges into a pair-sum equation:

```
nums[a] + nums[b] == nums[d] - nums[c]
```

That suggests splitting each quadruplet at its middle index `c`. If we
know, for every possible pair sum `s`, how many pairs `(a, b)` with
`b < c` satisfy `nums[a] + nums[b] == s`, then each `d > c` with
`nums[d] - nums[c] == s` contributes exactly that count — every valid
quadruplet is found exactly once, at its own `(c, d)` pair.

A single left-to-right sweep maintains that knowledge incrementally:
when the cursor reaches index `c`, add all pairs `(a, c - 1)` for
`a < c - 1` to the pair-sum map (so after the step, the map holds every
pair `(a, b)` with `b < c`), then query the map for `nums[d] - nums[c]`
for every `d > c`. No other data structure or precomputation is needed.

Why the map updates are valid: before processing `c`, every pair whose
larger index is `< c` is in the map. Step `c` inserts exactly the pairs
ending at `c - 1`, which closes the gap — by the time the query loop for
`c` runs, all pairs `(a, b)` with `b < c` are present, exactly the pairs
allowed by the index ordering. Indices `c - 1` and `d` always exist for
valid `c, d` because `n >= 4`.

The answer is at most `C(50, 4) = 230,300` (every choice of four indices
is a candidate, and the map counts each matching one), which fits
comfortably in 32-bit integers — no widening needed.

**Complexity:** `O(n²)` time, `O(n²)` worst-case space for the pair-sum
map (at most `n²` distinct sums).
