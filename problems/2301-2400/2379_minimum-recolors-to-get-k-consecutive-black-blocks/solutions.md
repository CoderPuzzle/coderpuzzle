# Solutions — Minimum Recolors to Get K Consecutive Black Blocks

## Sliding window over white counts

Recoloring can only turn whites black, so making a chosen window of `k`
consecutive blocks fully black costs exactly the number of whites inside
it — blacks are already free. The final run of `k` blacks will occupy some
window of the string, and the cheapest window is simply the one with the
fewest whites; scanning every window and keeping the minimum is the whole
problem.

The sliding window makes that scan linear. Initialize the white count for
the first `k` blocks, then slide right one position at a time: the entering
block may add a white, the leaving block may remove one, and the running
count tracks the current window exactly — no re-scan of the `k` cells per
step. The minimum count seen across all windows is the answer.

**Complexity:** `O(n)` time, `O(1)` extra space.
