# Solutions — Count Substrings That Satisfy K-Constraint II

A substring breaks the k-constraint exactly when it holds more than `k`
zeros and more than `k` ones at once, and that violation only deepens as the
substring grows — so for every right endpoint there is a boundary start such
that everything from it rightward is valid. Fixing those boundaries in one
sweep turns each range query into two prefix-sum lookups.

## Violation boundaries plus prefix sums

For each right endpoint `j` let `bound[j]` be the smallest start whose window
`s[bound[j]..j]` does not hold more than `k` of both characters; every start
in `[bound[j]..j]` then ends a valid substring at `j`, contributing
`j - bound[j] + 1` substrings. One two-pointer sweep computes all of them:
grow the window's right edge character by character, and advance its left
edge while zeros and ones both exceed `k`. The left pointer never moves
backward — enlarging a window can only add characters, so once a start is
invalid for some right endpoint it stays invalid for every later one — which
makes the whole sweep linear.

Because the boundary only moves right, the endpoints with `bound[j] < l`
form a prefix of any query range `[l, r]`: there, every start from `l` up to
`j` is valid, contributing the triangle `(j - l + 1)` summed over that
prefix. Precompute `next[l]`, the first endpoint whose boundary reaches `l`,
with a second monotone pointer pass, and accumulate the per-endpoint counts
into a prefix sum array. Each query then reads off in constant time: if
`next[l] > r` the whole range is clean and the answer is the triangle
`m * (m + 1) / 2` for `m = r - l + 1`; otherwise it is the triangle over the
clean prefix plus `pre[r + 1] - pre[next[l]]`.

A single query can cover all `n * (n + 1) / 2 ≈ 5 * 10⁹` substrings when
`n = 10⁵`, far beyond a signed 32-bit integer, so the prefix sums and every
answer are computed in 64-bit integers (exact in JavaScript doubles too,
since the largest intermediate stays below 2⁵³).

**Complexity:** `O(n + q)` time, `O(n)` space.
