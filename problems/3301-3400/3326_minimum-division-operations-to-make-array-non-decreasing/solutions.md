# Solutions — Minimum Division Operations to Make Array Non Decreasing

One operation on a composite `x` replaces it by its smallest prime factor —
the greatest proper divisor of a composite always leaves exactly that
prime — and on a prime it does nothing at all, since a prime's greatest
proper divisor is 1. So every element can finish only as itself or, for
one operation, as its smallest prime factor; nothing can ever become
smaller than that. The question is which elements to leave alone.

## Sieve the smallest prime factors, then a backward greedy

Precompute the smallest prime factor of every value up to `max(nums)` with
one Eratosthenes-style sieve. Then scan the array from right to left,
carrying `bound`, the value the element to the right settled on. For the
current `x`: if `x <= bound`, keep it — zero operations, and since keeping
leaves the largest possible value, it is also the loosest possible bound
for the left neighbor, so keeping dominates dividing whenever it fits. If
`x` exceeds the bound but its smallest prime factor fits, spend one
operation and settle on that prime. Otherwise `x` is prime above the bound
or composites whose prime floor is still too high — no sequence of
operations can fix it, and the answer is -1.

The greedy is forced, not heuristic: any final array assigns each element
one of its (at most two) reachable values, feasibility is a chain of `<=`
comparisons, and a larger settled value never makes a left neighbor
harder. Sieving dominates the cost below the scan; both passes are flat
iterative loops.

**Complexity:** `O(M log log M + n)` time for `M = max(nums)`, `O(M)`
space.
