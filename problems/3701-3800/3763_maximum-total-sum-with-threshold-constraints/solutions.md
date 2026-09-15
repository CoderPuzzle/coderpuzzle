# Solutions — Maximum Total Sum with Threshold Constraints

The simulation below rests on one observation: an element is not a
one-shot opportunity but a standing one. Once `step` reaches
`threshold[i]`, index `i` becomes eligible and stays eligible for every
later step, so the set of usable indices only ever grows as the process
advances. The process ends at the first step where that set is empty —
and since each step consumes exactly one element, the number of picks is
the length of the longest prefix of steps that never starves. Greedily
taking the largest usable value at every step is optimal for the same
reason exchange arguments work over monotone pools: any value skipped in
favor of a smaller one can never be recovered later, because the pool
gains elements as time passes, never loses them.

## Greedy step simulation with a max-heap

Group the indices by their threshold: bucket `t` holds every index that
unlocks exactly at step `t`, while everything with `threshold[i] <= 1`
goes straight into the heap. Then walk the steps forward. At step `s`,
first push all of bucket `s` into the max-heap — those elements just
became usable — then pop the top and add its value to the total. The
moment the heap is empty after a step's unlocks have been folded in, no
unused index qualifies and the process stops.

Two details keep this exact. First, the pop happens after the pushes:
an element unlocking at step `s` is legitimately available for the pick
at step `s`, which is what `threshold[i] <= step` says. Second, the
buckets are indexed by threshold value, and since every threshold is at
most `n`, a bucket beyond step `n` can never fire; the loop simply runs
out of heap before it runs out of steps.

Each index is pushed once and popped once, and each step does constant
work besides the heap operations, so the whole simulation is one linear
pass plus heap work.

The totals reach `n * max(nums) = 10⁵ * 10⁹ = 10¹⁴`, far past 32 bits,
so every compiled language accumulates in 64-bit (`long long`, `long`,
`int64_t`); JavaScript numbers are doubles, exact through 2⁵³, so they
hold it untouched.

**Complexity:** `O(n log n)` time, `O(n)` space.
