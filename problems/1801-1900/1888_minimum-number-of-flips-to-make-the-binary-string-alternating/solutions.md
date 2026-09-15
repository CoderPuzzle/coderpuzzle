# Solutions — Minimum Number of Flips to Make the Binary String Alternating

## Sliding window over the doubled string

The type-1 operation is a rotation, so the strings reachable for free are exactly the `n` cyclic shifts of `s`, written compactly as the length-`n` windows of `t = s + s`. For any fixed shift, the two alternating targets are complements of each other, so their mismatch counts sum to `n`; the cost for that shift is the smaller of the two.

To get every shift's mismatch count in constant time each, the code first builds `pre[i]`, the mismatches of the prefix `t[0:i]` against the single absolute pattern `0101...` indexed by the global position (`want = "01"[i & 1]`). A window starting at `k` then has `abs_mismatch = pre[k+n] - pre[k]` mismatches against that absolute pattern in one subtraction.

The parity correction comes next. Rotating by `k` makes what was global position `k` the new first character, and the target the rotated string must match is the alternating pattern aligned to the window's own start. When `k` is even the window's internal parity agrees with the absolute pattern, so the mismatches against the target beginning with 0 equal `abs_mismatch`; when `k` is odd every position's parity flips, and the cost against the 0-starting target becomes `n - abs_mismatch`. In both cases taking `min(cost_a, n - cost_a)` covers both starting characters, and the overall answer is the minimum over all `k`.

**Complexity:** `O(n)` time, `O(n)` space.
