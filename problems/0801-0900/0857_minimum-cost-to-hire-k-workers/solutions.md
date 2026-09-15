# Solutions — Minimum Cost to Hire K Workers

## Sort by ratio with a max-heap of qualities

Within a paid group every wage is proportional to quality, so once any wage is fixed the whole payroll is: if the group's pay rate is `r` per unit quality, worker `i` receives `r * quality[i]` and the group costs `r * sum(quality)`. The constraints require `r * quality[i] >= wage[i]` for every member, i.e. `r` must be at least each member's own `wage/quality` ratio — so the binding worker is the one with the largest ratio in the group, and any `r` equal to that maximum ratio is optimal. This turns the search into: for each candidate "binding" worker, cost equals their ratio times the total quality of the group.

Enumerating groups is avoided by sorting all workers by ratio and sweeping. When the sweep reaches worker `w`, every worker already seen has a ratio no larger, so treating `w` as the binding (highest-ratio) member, the cheapest compatible group is `w` plus the `k - 1` seen workers with the smallest qualities — smaller qualities mean a smaller sum at the same rate. A max-heap over the qualities of the current candidates maintains exactly that: push each arriving quality, and once the heap exceeds `k`, pop the largest, keeping the `k` smallest seen so far.

Whenever the heap holds exactly `k` workers, `total_quality * (w / q)` is a valid group cost and challenges the running best. The sweep is correct because every possible group has some maximum-ratio member, and the moment that member is processed the group's exact quality subset (all ratios below it) is available in the heap. Edge alignment is automatic: when duplicate ratios tie, processing order makes no difference since costs use the same rate.

Example 1 (`quality = [10,20,5]`, `wage = [70,50,30]`, `k = 2`) sweeps by ratio:

1. Sorted by `wage/quality` the workers arrive as (50, 20), (30, 5), (70, 10) with ratios 2.5, 6, 7.
2. The first worker alone cannot staff a group of two, so no cost is scored yet.
3. Reaching (30, 5) fills the heap with qualities {20, 5}: sum 25, cost `25 * 6 = 150`.
4. Reaching (70, 10) pushes 10 and evicts the 20: heap {5, 10}, sum 15, cost `15 * 7 = 105`.
5. The answer is 105 — pay 70 and 35 at the binding ratio 7.

**Complexity:** `O(n log n)` time, `O(n)` space.
