# Solutions — Maximum Number of Groups With Increasing Length

## Sort, then binary search the group count on a supply condition

Strictly increasing positive lengths mean the j-th group holds at least j
members, and trimming every group down to size j only removes elements, so
distinctness, the per-number budgets, and strict increase all survive.
Answering for x groups is therefore exactly: can groups of sizes 1, 2, …,
x be filled at once? Distinctness caps number `i` at one appearance per
group, so across any chosen set of m groups it can supply at most
`min(usageLimits[i], m)` elements — its budget may bind first, the m-way
spread may bind first.

That observation yields an exact feasibility test. The m largest groups
(sizes `x-m+1 … x`) demand `m*(2x-m+1)/2` elements in total, and each
number feeds at most `min(usageLimits[i], m)` of them, so a filling exists
only if `sum(min(usageLimits[i], m)) >= m*(2x-m+1)/2` for **every**
`m <= x`. Necessity is immediate; sufficiency is the classical bipartite
feasibility theorem (equivalently, integrality of max flow from numbers to
groups): if every subset of groups passes its supply test, an integral
assignment exists, and the largest-m subsets are always the binding ones.
The quantifier matters — checking only the full total `m = x` is not
enough: `[4, 4, 1, 1]` has exactly the 10 usages that four groups need,
yet after the size-4 group consumes all four numbers, only two numbers
remain for the size-3 group. Feasibility shrinks as x grows, so binary
search finds the largest feasible `x`, which never exceeds `n` (the
biggest group needs n distinct numbers).

The algorithm sorts ascending and sweeps the supply table once:
`g[m] = sum(min(v, m)) = g[m-1] + (count of entries >= m)`, maintained
with a forward pointer over the sorted array. Each binary-search probe
walks `m` from 1 to x with early exit on the first violated demand.
Intermediates reach `g[m] <= 10^5 * 10^9 = 10^14`, so Java, Go, C++, and
Rust accumulate in 64-bit integers; JavaScript numbers stay exact below
2^53 ≈ 9 * 10^15, safely above that ceiling.

**Complexity:** `O(n log n)` time, `O(n)` space.
