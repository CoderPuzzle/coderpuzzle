# Solutions — Minimize Manhattan Distances

The Manhattan metric becomes axis-separable under a 45-degree rotation:
for `u = x + y` and `v = x - y`, the distance between two points equals
`max(|du|, |dv|)`. Both rotated coordinates stay within about
`[-10⁸, 2 × 10⁸]`, and the
largest possible pairwise distance — the full range of both coordinates
at once — stays below `4 * 10⁸`, comfortably inside a signed 32-bit
integer, so no widening is needed anywhere in the computation.

## Chebyshev rotation plus sorted-axis extremes

Transform every point to `(u, v)` once. After deleting point `p`, the
maximum remaining Manhattan distance is the larger of the two coordinate
ranges with that single occurrence of `p` removed: `u_max - u_min` and
`v_max - v_min`. A range minus one occurrence only changes if `p`
supplies an extreme, so sorting the indices by `u` (and separately by
`v`) lets each exclusion be answered in constant time: take the opposite
end of the sorted order when `p` sits there, otherwise keep the original
endpoints.

One pass over all candidate removals evaluates those four lookups per
point and keeps the smallest resulting maximum; ties are harmless because
a duplicate value occupies the next slot of the sorted order whenever an
extreme is removed. Sorting dominates at `O(n log n)` time, and only a
constant number of index arrays beyond the input are kept — `O(n)`
extra space.
