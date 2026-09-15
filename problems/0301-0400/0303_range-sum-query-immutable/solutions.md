# Solutions — Range Sum Query - Immutable

## Prefix Sums

Because the array is fixed at construction time, every `sumRange(left, right)` queries the same unchanging data — so the work of summing should happen once, not per call. The `NumArray` class precomputes `prefix`, where `prefix[i]` holds the sum of the first `i` elements and `prefix[0]` is 0. Building it is a single left-to-right pass in which each entry extends the previous one by one element.

With the table in hand, any range sum telescopes into the difference of two prefixes: `sumRange(left, right) = prefix[right + 1] - prefix[left]`. The elements before `left` cancel, leaving exactly `nums[left] + ... + nums[right]`. Each query is one array lookup pair and one subtraction, independent of the range length.

Both the Python and Java canonical solutions implement exactly this table (the Java version accumulates into `long`, comfortably above the worst-case total of `10⁴ · 10⁵ = 10⁹`). With at most `10⁴` queries over at most `10⁴` elements, the whole workload is linear preprocessing plus constant-time lookups, satisfying the follow-up.

**Complexity:** `O(n)` construction, `O(1)` per `sumRange`, `O(n)` extra space.
