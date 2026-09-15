# Solutions — Minimum Distance Between Three Equal Elements II

## Consecutive triples within each value

However the three indices of a good tuple are ordered, its three pairwise
gaps fold into exactly twice the outer span: abs(i - j) + abs(j - k) +
abs(k - i) always equals 2 * (max(i, j, k) - min(i, j, k)). Minimizing the
distance therefore asks for three equal values whose outermost indices span
as little as possible — once the two ends of the triple are fixed, the best
middle index is irrelevant to the cost.

One left-to-right pass drops every index into the bucket of its own value,
and each bucket comes out sorted for free because indices arrive in
increasing order. Inside such a bucket no triple beats some consecutive
window: for any three entries p < q < r, the two entries immediately
following p sit no later than q and r do, so the window opened at p already
spans no more than p through r does. The minimum span over all triples is
therefore attained by a fully consecutive one, and scanning every window of
three consecutive entries — keeping the smallest
`indices[start + 2] - indices[start]` — visits an optimal triple of every
value.

A value with fewer than three occurrences contributes no windows at all; if
no bucket ever yields one, no good tuple exists and the answer is -1.
Otherwise the winning span doubles into the distance. Spans never exceed
n - 1, so twice the best span stays far inside 32-bit range even at the
n = 10^5 cap.

**Complexity:** `O(n)` time, `O(n)` space.
