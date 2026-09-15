# Solutions — Minimum Moves to Equal Array Elements

## Total distance from the minimum

The move's shape is the whole trick. Adding `1` to `n - 1` of the elements
leaves exactly one element behind, and every pairwise gap in the array moves
exactly as it would if that one skipped element alone had dropped by `1` —
incrementing all but one is decrementing that one in disguise. The problem
therefore restates as: pick one element per move and subtract `1` from it;
how many such unit decrements make all elements equal?

A decrement never lifts an element, so whatever common value the array settles
on, it can sit no higher than the smallest starting element: each element
`x` needs exactly `x - t` decrements to reach a target `t`, and the total
`sum(nums) - n * t` only grows as `t` sinks. The cheapest reachable target is
`t = min(nums)` — the whole array converges on its minimum — and the answer is
`sum(nums) - n * min(nums)`.

That formula needs one numerical caution: with `n` up to `10⁵` and values as
large as `±10⁹`, the running total itself reaches `10¹⁴`, far beyond 32-bit
range, so the sum and the product accumulate in 64 bits in fixed-width
languages. Only the final difference is promised to fit in 32 bits, and it is
cast down at the very end.

**Complexity:** `O(n)` time, `O(1)` space.
