# Solutions — Sum of Variable Length Subarrays

Every index `i` names one window, `nums[max(0, i - nums[i]) .. i]`, and the
answer is the sum of all windows put together — n ranges, each answerable in
constant time once the running totals are already in hand.

## Prefix sums

Build the prefix-sum array `prefix` with `prefix[i]` holding the sum of the
first `i` elements; then window `i` sums to `prefix[i + 1] -
prefix[max(0, i - nums[i])]`, because the window always ends exactly at `i`.
The clamp to 0 is the only irregularity — whenever `nums[i] >= i` the window
reaches back to the array's start — and `max(0, ...)` absorbs it before the
lookup. On `nums = [2,3,1]` the three windows sum to 2, 5, and 4, totalling 11.

Size-wise nothing overflows 32 bits: at most 100 windows, each at most 100
elements of at most 1000, cap the total at `10^7`. With `n <= 100` a plain
re-summation per window would also pass, but the prefix array keeps the work
linear and matches the problem's own vocabulary.

**Complexity:** `O(n)` time, `O(n)` space.
