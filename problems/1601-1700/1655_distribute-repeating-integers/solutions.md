# Solutions — Distribute Repeating Integers

A customer's integers must all be equal, so each customer draws from a
single value — and a value with count `c` serves any group of customers
whose quantities sum to at most `c`, with several customers free to share
one value. Sharing is what makes the problem hard: serving customers in
order can strand a later order that only fits beside earlier ones, so no
single greedy pass decides it. Only the counts matter, `m <= 10` keeps the
customer set tiny, and there are at most 50 distinct values — exactly the
shape a subset dynamic program over customer bitmasks wants.

## Subset DP over customer bitmasks

Count the frequencies of `nums` first; every decision after that involves
only the list of counts. Precompute `subset_sums[mask]`, the total amount
ordered by the customers in `mask`, with the lowest-bit recurrence
`subset_sums[mask] = subset_sums[mask ^ low] + quantity[index of low]` —
one pass over all `2^m` masks. Quantities sum to at most `10 · 10⁵`, well
inside 32-bit range.

The DP then processes one frequency value at a time.
`reachable[mask]` records that the customers in `mask` are fully served
using only the values seen so far. Each value either stays unused — the
whole previous layer carries over — or takes one subset of the
still-unsatisfied customers whose quantity sum fits within its count,
extending `mask` by that submask. Enumerating submasks of `available`
with `sub = (sub - 1) & available` visits each `(mask, submask)` pair
exactly once, `3^m` pairs in total per frequency value.

Any valid distribution partitions the customers into one group per value,
every group's sum bounded by its value's count, and the DP sweeps exactly
those partitions in some order — so it reaches the full mask precisely
when a distribution exists.

**Complexity:** `O(F * 3^m + n)` time, `O(2^m)` space (`F` = distinct
values, `m` = customers).
