# Solutions — Find Minimum Operations to Make All Elements Divisible by Three

## One operation per non-divisible element

Each operation touches exactly one element, so the elements are fully
independent and the total cost is the sum of per-element costs. For a
single value `v` with remainder `r = v % 3`, the nearest multiple of 3 is
one step away when `r` is 1 (subtract) or 2 (add), and zero steps away
when `r` is 0. No sequence of operations can beat that: reaching any
multiple of 3 from `v` takes at least `min(r, 3 - r)` unit steps, since
each op moves `v` by exactly 1. Note this allows stepping down to 0 —
subtracting 1 from 1 yields a divisible array — which the formula covers
naturally.

So the answer is simply `sum over nums of min(v % 3, (3 - v % 3) % 3)`,
computed in a single pass. With `nums.length <= 50`, the total stays
below 100 — trivially inside 32 bits.

**Complexity:** `O(n)` time, `O(1)` extra space.
