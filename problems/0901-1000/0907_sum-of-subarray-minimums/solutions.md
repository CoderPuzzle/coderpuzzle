# Solutions — Sum of Subarray Minimums

## Monotonic Stack Contribution Counting

Rather than enumerating all `O(n^2)` subarrays, flip the accounting: `arr[i]` is the minimum of some set of subarrays and contributes its value times that count. A subarray has `arr[i]` as its minimum exactly when its left endpoint lies in `(left[i], i]` and its right endpoint in `[i, right[i])`, where `left[i]` is the index of the previous element strictly smaller than `arr[i]` and `right[i]` the index of the next element smaller than or equal to it. The count is then `(i - left[i]) * (right[i] - i)`.

![Each element's dominance span in [3, 1, 2, 4], with the (i − left) · (right − i) contribution of each.](figures/solution-min-spans.svg)

Both boundary arrays come from monotonic stacks in one linear pass each, since every index is pushed and popped at most once. The asymmetry — the left pass pops elements `>= arr[i]`, the right pass only `>` — is deliberate: when equal values tie for the minimum, each subsequence of choices attributes its minimum to the leftmost of the tied positions only, so no subarray is double-counted and none is missed. The sentinels `-1` and `n` let a minimum extend to the array's border.

The contributions `arr[i] * (i - left[i]) * (right[i] - i)` are summed as exact Python integers and reduced modulo `10^9 + 7` once at the end; a fixed-width language would instead reduce per term with 64-bit intermediates.

**Complexity:** `O(n)` time, `O(n)` space.
