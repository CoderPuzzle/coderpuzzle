# Solutions — Maximum Performance of a Team

## Sorting by efficiency with a min-heap of speeds

The performance formula `sum(speeds) * min(efficiency)` is awkward because the multiplier couples the whole team. Decouple it by fixing the minimum: process engineers in decreasing order of efficiency and, at each moment, treat the current engineer as the one setting the team's minimum. Everyone already processed has efficiency at least as high, so any team whose bottleneck is the current engineer is a subset of the engineers seen so far — and the best such team simply takes the fastest available members.

Maintain a min-heap of the chosen engineers' speeds alongside a running `speed_sum`. Push each arriving engineer; if the heap then holds more than `k` members, evict the slowest (the heap's minimum) and subtract it from the sum. After this upkeep the heap holds the `k` fastest engineers among those with efficiency >= the current one, so `speed_sum * eff` is the best performance of any team that this engineer caps; track the maximum over the sweep.

Why this covers every candidate team: for the optimal team, consider its lowest-efficiency member — that member appears as "current" at some step of the sweep, all its teammates appear earlier (higher efficiency), and the heap at that step contains the fastest possible `<= k` of them, so the recorded value is at least the optimum. Fewer than `k` members is naturally allowed, since the team size only exceeds `k` transiently before eviction.

Only the final answer is reduced modulo `10^9 + 7`; the running products stay as full integers because speeds (`<= 10^5`) times efficiency (`<= 10^8`) overflows 32-bit but fits comfortably in Python's arbitrary-precision ints — the comparison `max` must happen on true values, not residues. Edge cases like `k = n` (no eviction ever fires) fall out of the loop structure.

**Complexity:** `O(n log n)` time, `O(n)` space.
