# Solutions — Number of Subarrays With LCM Equal to K

## Anchored sweep with a monotone LCM

Fix the left endpoint `i` and extend the right endpoint `j` one element at a
time, carrying the least common multiple of `nums[i..j]` (hint 2). The
carried value is monotone: appending an element can only raise an lcm, never
lower it, so one left-to-right pass per anchor visits every subarray with
that left endpoint exactly once. Whenever the running lcm equals `k`, the
subarray `nums[i..j]` counts, and each qualifying `(i, j)` pair is counted on
its own visit — nothing is missed or double-counted.

The early break is what keeps this fast. An lcm of a growing set can only
grow, and once it exceeds `k` every larger subarray with the same left
endpoint has an even larger lcm, so `k` is unreachable and the inner sweep
stops (hint 3). Because `nums[i]` and `k` are at most `1000`, every lcm the
sweep keeps is at most `k`, so the next step computes an intermediate below
`10⁶` — comfortably inside 32 bits everywhere. The worst case is a run of
`1`s with `k = 1`, where the lcm never grows and all `n(n+1)/2` subarrays
are enumerated.

**Complexity:** `O(n²)` time, `O(1)` space.
