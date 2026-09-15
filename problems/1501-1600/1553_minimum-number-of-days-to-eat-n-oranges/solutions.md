# Solutions — Minimum Number of Days to Eat N Oranges

## Memoized recursion

Eating one orange at a time from `n` is always available, but wasteful
whenever `n` shares a factor with `2` or `3`: paying off the remainder in
single-orange days and then taking one large `n / 2` or `2n / 3` bite
reaches a much smaller state in the same number of days it would have
taken to inch there one orange at a time. That gives the recurrence
`dp(n) = min(n % 2 + 1 + dp(n / 2), n % 3 + 1 + dp(n / 3))`, with base
cases `dp(0) = 0` and `dp(1) = 1`; trying both branches and keeping the
cheaper one is safe because neither move dominates the other in general.

Naively unrolled, this recurrence branches twice per call and would blow
up exponentially. But every recursive call divides `n` by `2` or `3`
first, so the set of distinct arguments reachable from a starting `n` is
tiny — only the O(log² n) numbers obtainable by repeatedly floor-dividing
by `2` and `3` in some order. A hash-map memo keyed by the remaining
count collapses the shared subproblems, and the recursion itself is
shallow: floor-dividing even `n = 2 * 10^9` by `2` reaches `0` in about
31 steps, well within any language's default call-stack budget.

**Complexity:** `O(log² n)` time, `O(log² n)` space.
