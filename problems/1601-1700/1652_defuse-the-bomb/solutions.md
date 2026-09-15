# Solutions — Defuse the Bomb

## Direct circular sum

If `k == 0` the answer is immediate: every position becomes `0`, no
summing required. Otherwise each output position `i` needs the sum of
`|k|` neighbors, taken forward when `k > 0` and backward when `k < 0`.
Because the array is circular, "forward" and "backward" indices can walk
past either end, so every index used to read `code` is wrapped with
`(index % n + n) % n` — the extra `+ n` before the second modulo keeps
negative offsets from previous-direction sums correct in languages whose
`%` can return a negative result.

The implementation loops over each position `i`, then loops `|k|` steps
in the required direction, accumulating `code` at each wrapped index into
that position's sum. With `n <= 100` and `|k| < n`, this nested loop does
at most about `n * n` additions, which is trivially fast at this scale;
no prefix-sum or sliding-window bookkeeping is needed to stay within the
limits.

**Complexity:** `O(n * k)` time, `O(n)` space.
