# Solutions — Maximum Value of an Ordered Triplet I

## One pass with running prefix maxima

A triplet `(i, j, k)` factors into two decisions: pick the pair `i < j` that
maximizes `nums[i] - nums[j]`, then multiply that best difference by the
`nums[k]` standing to its right. So one left-to-right sweep suffices — at
each element, treated as `k`, two running values summarize everything the
prefix can contribute: `maxPrefix`, the largest element seen so far (the
best `i`), and `bestDiff`, the largest `nums[i] - nums[j]` over pairs fully
inside the prefix (the best `(i, j)`). The element is first multiplied into
`bestDiff` as a candidate answer, then used as the `j` of a new pair against
`maxPrefix`, then folded into `maxPrefix` itself; updating in exactly that
order keeps every index relation `i < j < k` intact.

The `0` floor does double duty: it is the statement's required answer when
every triplet is negative, and it is also the correct "no pair yet" sentinel
because the constraints make every element positive, so `bestDiff` can only
turn positive once a real decreasing step has been seen. The answer is
bounded by `(10⁶ - 1) · 10⁶ < 2⁵³`, which exceeds 32 bits — hence the 64-bit
return in every typed language — but stays far inside JavaScript's exact
`Number` range.

**Complexity:** `O(n)` time, `O(1)` space.
