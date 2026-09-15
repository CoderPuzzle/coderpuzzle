# Solutions — Minimum Impossible OR

An OR only stacks bits upward — participants never lose a bit they carry —
so the reachable set is governed by which single bits appear in isolation
somewhere in the array. That observation hands over both halves of the
answer before any search happens: what is certainly expressible below a
given power of two, and why that power itself is not.

## First missing power of two

Once `1, 2, 4, ..., 2^(k-1)` are all in the array, every positive integer
below `2^k` is expressible: each such integer picks out a subset of those
`k` disjoint single-bit elements, and ORing exactly the members matching
its bits rebuilds it with nothing extra. So no candidate smaller than
`2^k` can be the answer once the lower powers are covered.

Conversely, an OR equal to `2^k` needs every participant's bits inside
`{k}` — anything carrying a neighbor bit leaks into the result. At least
one participant must supply bit `k`, and staying inside `{k}` forces its
value to be exactly `2^k`. So `2^k` is expressible precisely when it is
present as an element, and the first absent power of two is the minimum
impossible OR. Scanning `1, 2, 4, ...` through a hash set finds it; since
`nums[i] <= 10^9 < 2^30`, the value `2^30` can never occur in the array,
so the scan returns by `2^30` at the latest — within the declared 32-bit
return range (`2^30 < 2^31`) and far under JavaScript's exact-Number
bound `2^53`.

**Complexity:** `O(n)` time expected, `O(n)` space.
