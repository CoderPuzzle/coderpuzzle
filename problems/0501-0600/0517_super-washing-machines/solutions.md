# Solutions — Super Washing Machines

## Imbalance bottlenecks

Every move only passes existing dresses around, so their total is invariant:
the machines can end equal only at `average = total / n`, and when
`total % n != 0` no such target exists — the answer is `-1`. Once the average
is an integer, each machine `i` is really carrying a signed excess
`machines[i] - average`, and the question is how many one-dress-per-move
passes it takes to settle them.

Cut the line at the boundary between machines `i` and `i + 1`. The left block
must end with `(i + 1) * average` dresses, so exactly
`sum(machines[0..i]) - (i + 1) * average` dresses cross that boundary
left-to-right — negative meaning right-to-left — whatever the schedule looks
like. A move sends at most one dress across any fixed boundary, so the answer
is at least the absolute value of that crossing at every boundary; a running
prefix sum of the excesses finds the worst boundary in one pass.

Boundaries alone still undercount one shape. A machine passes at most one
dress per move even when both neighbors are short, so a surplus machine
between two deficit regions pays for its leftward and rightward shipments
sequentially: it needs one move per dress of its excess, which is exactly
`machines[i] - average` — the sum of the two outward flows across its
boundaries. The answer is the maximum of all boundary crossings and all
machine excesses: a lower bound on any schedule, and achievable because a
single move can serve every unsatisfied boundary and every still-owing
machine at once, so no bottleneck ever waits on another.

**Complexity:** `O(n)` time, `O(1)` space.
