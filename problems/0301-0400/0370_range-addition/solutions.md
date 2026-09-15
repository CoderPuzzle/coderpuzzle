# Solutions — Range Addition

## Difference array

Applying each update naively touches every index in its range, costing up to `O(k · length)` overall. The difference-array technique records only where a running total _changes_: for an update `[start, end, inc]`, add `inc` at position `start` and subtract `inc` at position `end + 1`. The array of actual values is then recovered by one prefix-sum sweep — each element equals the accumulated deltas of all updates whose ranges still cover it.

Why it works: element `arr[i]` should receive the sum of `inc` over all updates with `start <= i <= end`. After the two marker writes, the running prefix at index `i` includes exactly those updates — `inc` entered the running total at `start` (which is `<= i`) and leaves it only after `end + 1` (which is `> i`). Allocating the difference array with one extra slot (`length + 1`) makes the `end + 1` write safe even when `end == length - 1` without any bounds branching.

Edge cases: zero updates fall straight through the prefix sweep and return all zeros; negative increments are just negative deltas; and overlapping ranges accumulate naturally because deltas add before the single reconstruction pass. The output is built during the same sweep, so the work is proportional to the input size plus the array length, independent of how long the individual ranges are.

**Complexity:** `O(k + n)` time (where `k` is the number of updates and `n` is `length`), `O(n)` space.
