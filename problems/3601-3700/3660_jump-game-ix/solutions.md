# Solutions — Jump Game IX

## Inversion segments

The two jump rules are one rule in disguise. For indices `p < q`, the forward
jump `p -> q` needs `nums[q] < nums[p]`, and the backward jump `q -> p` needs
`nums[p] > nums[q]` — literally the same condition. So direction never
matters: `p` and `q` are connected exactly when the pair is inverted (the
later index holds the strictly smaller value), and `ans[i]` is the largest
value inside the connected component of index `i` in this inversion graph.

Components here are contiguous ranges. Whenever an edge joins `i < j`, it
covers everything in between: a middle index `k` either has
`nums[k] < nums[i]` and joins `i` directly, or has `nums[k] >= nums[i] >
nums[j]` and joins `j` directly. Chaining overlapping edges therefore keeps
each component within one interval, and no inverted pair can straddle two
components. So between adjacent components every left value is `<=` every
right value — a cut — and conversely, wherever the prefix maximum strictly
exceeds the suffix minimum, some inverted pair crosses that boundary and the
component continues.

That turns the answer into one scan. Precompute suffix minima, then sweep
left to right growing the current segment while its running maximum stays
strictly above the suffix minimum just past it; when the maximum drops to
`<=` that minimum (or the array ends), the segment closes and every index in
it reports the segment maximum. Equal values cut naturally, because an
inverted pair must be strict.

**Complexity:** `O(n)` time, `O(n)` space.
