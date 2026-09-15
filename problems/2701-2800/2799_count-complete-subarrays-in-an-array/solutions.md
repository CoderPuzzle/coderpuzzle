# Solutions — Count Complete Subarrays in an Array

## Sliding window, at-most-k minus at-most-(k−1)

Let `k` be the number of distinct values in the whole array — a subarray is
complete exactly when it holds all `k` of them. Counting "exactly k" windows
directly is awkward because extending a window can raise or lower its distinct
count, so count something monotone instead: `atMost(m)`, the number of
subarrays containing at most `m` distinct values. Every complete subarray is
counted by `atMost(k)` but by none of `atMost(k − 1)`, so the answer is simply
`atMost(k) − atMost(k − 1)`.

One sweep computes each term with a frequency map and a forward-only left
boundary. For each `right`, append `nums[right]` to the window and then shrink
from the `left` while the window exceeds `m` distinct values; because growing
a window never reduces that count, `left` only ever moves forward, and after
the shrink it rests on the smallest valid start for this endpoint. Every start
in `[left, right]` therefore yields a valid subarray, contributing
`right − left + 1`. The `m = 0` sweep shrinks every window empty and correctly
contributes nothing, which is what makes the all-equal case (`k = 1`) come out
at `n(n+1)/2`. With `n ≤ 1000` the largest possible answer is
`1000 · 1001 / 2 = 500500`, comfortably inside 32-bit range, so the
fixed-width languages return plain `int`.

**Complexity:** `O(n)` time, `O(n)` space.
