# Solutions — Maximum of Minimum Values in All Subarrays

## Monotonic Stack Spans with a Suffix Maximum

For query length `L`, the answer is the maximum, over all windows of size `L`, of the window minimum. Flip the perspective onto elements: `nums[i]` is the minimum of every window that contains it but no smaller element. If `left[i]` and `right[i]` are the nearest strictly smaller elements on each side (found with two monotonic stack passes that pop while the stack top is `>= nums[i]`), then `nums[i]` is a valid minimum for every window length up to `span = right[i] - left[i] - 1`, so it is a lower-bound candidate for `ans[span - 1]`.

One element seeds only its maximal span, not the shorter lengths it also covers — that gap is repaired by monotonicity of the answers. The answer for length `k` is always at least the answer for length `k + 1`, because any window of size `k + 1` contains a sub-window of size `k` whose minimum is no smaller. Hence after writing each element's value into `ans[span - 1]` (keeping the maximum when several elements claim the same span), a single right-to-left running maximum fills every shorter length with the best value any longer span guarantees. The `>=` (rather than `>`) pop condition deliberately splits spans at equal values, giving each duplicate the sub-window where it is the minimum; the suffix maximum then reconciles any conservative seed, so ties need no special handling.

All three phases — the two stack passes, the seeding loop, and the suffix max — touch each index a constant number of times, and the seeded value at `ans[n-1]` is always the global minimum since the whole array is one valid span for its minimum element.

**Complexity:** `O(n)` time, `O(n)` space.
