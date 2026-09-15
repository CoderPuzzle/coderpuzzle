# Solutions — Maximum Sum of M Non-Overlapping Subarrays II

## WQS binary search with a monotonic deque

Charge a penalty `x` for every selected subarray. For this fixed penalty, a
prefix DP stores the greatest adjusted sum and, among equal sums, the greatest
number of selected subarrays. A segment ending at `i` and starting at `j`
contributes `prefix[i] - prefix[j] - x`, so the transition needs the maximum
of `dp[j].value - prefix[j]` over `i - r <= j <= i - l`. A monotonic deque
supplies that maximum while a left-to-right sweep also carries forward the
option to skip position `i`.

The selected count is nonincreasing as the penalty grows. If the zero-penalty
optimum already uses at most `m` segments, it is the answer. Otherwise, binary
search the largest integer penalty whose tie-broken optimum still uses at
least `m` segments; adding `penalty * m` to its adjusted value recovers the
constrained optimum. If zero penalty chooses no segment, every legal segment
has negative sum, so a second monotonic-deque scan returns the best single
legal segment and enforces the requirement to choose at least one.

Prefix sums, adjusted DP values, and `penalty * m` require 64-bit arithmetic:
their absolute values are bounded by about `10¹⁵`, below the signed 64-bit
limit and below JavaScript's exact-integer limit `2⁵³`. All scans are
iterative.

**Complexity:** `O(n log(nV))` time and `O(n)` space, where `V =
max(|nums[i]|)`.
