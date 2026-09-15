# Solutions — Minimum Increment Operations to Make Array Beautiful

## Rolling window dynamic programming

Raising a position above k never helps: every subarray a value above k
can certify, the value k certifies just as well. So each position i has a
fixed cost `max(0, k - nums[i])` for being raised to k, and a plan is a
set of raised positions. The beautiful condition simplifies to: every
window of exactly 3 consecutive positions contains a raised position. Any
subarray of size 3 or more contains one of these windows, so a passing
window set passes every subarray, and the size-3 subarrays themselves are
windows — the two conditions are the same.

Let dp[i] be the minimum cost of a plan in which every window inside the
prefix ending at i is covered and position i itself is raised. The
previous raised position must then lie within distance 3 of i, giving
`dp[i] = cost(i) + min(dp[i-1], dp[i-2], dp[i-3])` for i >= 3, with
`dp[i] = cost(i)` for the first three positions, whose windows are all
covered by i alone. Every window is covered by its last position or
nothing before it, so the answer is the minimum of the last three dp
values. Only the three most recent states are ever read, so the table
collapses to three rolling variables in a single left-to-right pass.

Widening: the total cost reaches `10⁵ · 10⁹ = 10¹⁴`, far past 32-bit
range, so C++, Java, Go, and Rust carry the three rolling costs in a
64-bit type (`long long`, `long`, `int64`, `i64`). Python integers are
unbounded. JavaScript and TypeScript never touch a bitwise operator here
— the arithmetic is only adds, compares, and max/min — and every value
stays below 10¹⁴ < 2⁵³ ≈ 9.0 × 10¹⁵, so plain doubles are exact.

**Complexity:** `O(n)` time, `O(1)` space.
