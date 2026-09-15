# Solutions — Maximum Sum of Distinct Subarrays With Length K

## Sliding Window with Frequency Map

All candidate windows have exactly length `k`, so sliding one position at a time changes only two elements: the newcomer at index `i` enters and the retiree at `i - k` leaves. Maintaining a running sum and a value-frequency dictionary for the current window turns each step into constant amortized work instead of an `O(k)` rescan.

Distinctness is checked structurally rather than by comparison: when the dictionary entry for the departing value drops to zero it is deleted, so the map's size is exactly the number of distinct values in the window. A window is all-distinct precisely when `len(counts) == k`, since a window of `k` slots with `k` distinct values has no repeats. The check runs once the window first fills (`i >= k - 1`), and the best sum is updated only for qualifying windows; `best` starts at 0 so an input with no valid window, like `[4,4,4]` with `k = 3`, returns 0.

![The example array 1, 5, 4, 2, 9, 9, 9 with its five length-3 windows: the first three are all-distinct with sums 10, 11, and 15, while the last two repeat a 9 and shrink the map to fewer than 3 keys, leaving 15 as the answer.](figures/solution-window-evolution.svg)

The order of operations matters at the boundary: at `i >= k` the leaving element is removed _before_ the window is evaluated, keeping exactly `k` members at each check. Deleting zero-count keys (rather than leaving stale zeros) is what keeps the map size meaningful, and it also bounds the dictionary at `k + 1` entries at any moment.

One pass, constant amortized per element (dictionary operations on bounded size), gives linear time overall; the answer fits comfortably since sums reach at most `10^5 · 10^5 = 10^{10}`, handled natively by Python integers.

**Complexity:** `O(n)` time, `O(k)` space.
