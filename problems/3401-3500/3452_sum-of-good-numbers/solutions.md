# Solutions — Sum of Good Numbers

Goodness is a local property: an element only has to beat the (at most two)
elements sitting exactly `k` slots away, so a single left-to-right sweep that
tests each index against its existing offset neighbors and accumulates the
winners is all the problem asks for.

## One sweep over the offset neighbors

For each index `i` the two candidate blockers are `i - k` and `i + k`. A
blocker that falls outside the array does not constrain the element at all, so
each side's test is "the neighbor is missing, or `nums[i]` is strictly greater
than it"; the element is good exactly when both sides pass. Guarding the index
bounds before subscripting keeps every access in range, and the strict
comparisons make ties count as not good, as the definition demands.

The sweep adds each good element to a running total and returns it at the end.
With `n <= 100` and values at most `1000`, the total is bounded by `100000`,
so plain machine integers carry it in every language. Since `k` never exceeds
`floor(n / 2)`, every index has at least one existing neighbor, but the code
never relies on that — the missing-neighbor case is handled uniformly by the
guards.

**Complexity:** `O(n)` time, `O(1)` space.
