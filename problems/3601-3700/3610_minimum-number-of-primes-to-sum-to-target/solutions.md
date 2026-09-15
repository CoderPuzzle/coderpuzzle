# Solutions — Minimum Number of Primes to Sum to Target

Choosing a multiset of primes to hit exactly `n` with the fewest elements is
an unbounded coin-change: each available prime is a coin that may be used
any number of times, and the answer is the smallest multiset size that sums
to `n`. Because the two loops order an array scan rather than enumerate
subsets, the problem collapses to one pass of a shortest-sum table.

## Unbounded knapsack over the first m primes

First generate the first `m` primes by trial division against the primes
already found (the `m`-th prime is 7919 for `m = 1000`, so the search stays
tiny). Then `dp[i]` stores the fewest primes whose sum is exactly `i`:
`dp[0] = 0`, and for each total `i` every prime `p` below it offers the
transition `dp[i] = min(dp[i], dp[i - p] + 1)`. Since `dp[i - p]` is
already final when `dp[i]` is computed, reusing a prime many times is
handled naturally — example 1's `10 = 2 + 2 + 3 + 3` is the chain of four
such transitions.

Primes larger than `n` can never appear in a sum of `n`, so they never win a
transition; the loop still passes over them and simply never updates. If
`dp[n]` never leaves its sentinel value no multiset exists and the method
returns `-1`, which happens exactly when the available primes cannot
generate `n` — for example `n` odd with only the prime 2 available.

**Complexity:** `O(n · m)` time, `O(n)` space.
