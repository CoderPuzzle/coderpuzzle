# Solutions — Divide an Array Into Subarrays With Minimum Cost I

## Two smallest values after the fixed head

Place the two cuts at positions `p` and `q` with `p < q`, both in
`[1, n-1]`: the subarrays are then `nums[0..p)`, `nums[p..q)`, and
`nums[q..n)`. Each one contributes the value of its first element, so
every split costs exactly `nums[0] + nums[p] + nums[q]` — the head of the
array is always the first subarray's cost, and each cut position donates
the element that starts the subarray it opens.

Minimizing that sum over all pairs means choosing the two smallest values
among `nums[1]` through `nums[n-1]` as the cut elements. One scan keeps
the two smallest seen so far in `smallest` and `second`: a value below
`smallest` demotes it to `second`, and a value between the two promotes
itself to `second`. Equal values fall out correctly, since two copies of
the minimum are meant to occupy both slots.

The answer is `nums[0] + smallest + second`. When `n = 3` both cuts are
forced (`p = 1`, `q = 2`) and every subarray is a singleton, which is
exactly what seeding the two slots with `nums[1]` and `nums[2]`
reproduces.

**Complexity:** `O(n)` time, `O(1)` space.
