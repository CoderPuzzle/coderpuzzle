# Solutions — Maximize Profit from Task Assignment

The exact-equality skill rule means no assignment ever crosses a skill
boundary: the instance slices into independent classes, one per skill
level, and the single wildcard worker is the only thing that connects
them.

## Per-skill top profits, best leftover to the extra worker

Count the workers per skill and group the tasks by their requirement.
Within one class every worker is interchangeable with every other and
can take any task of that class, so with `k` workers any `k` of the
class's tasks can be completed — maximizing profit means taking the `k`
most profitable. Sorting each group descending and summing the top
`min(k, group size)` entries settles every regular worker at once; which
worker gets which task is immaterial.

The additional worker adds exactly one more completed task, chosen from
whatever the classes leave unconsumed. That is the maximum over each
group's first untaken profit — the `(k+1)`-th of a class with more tasks
than workers — and nothing else: giving the wildcard a task some regular
worker could have taken never helps, since that worker could swap into
the wildcard's task instead, leaving the total no smaller (a one-line
exchange argument). So a single running maximum over the leftovers,
added at the end, is the whole wildcard computation. On the second crawl
example nobody matches skill 1, and the wildcard alone collects the 100.

Up to `10⁵ + 1` completed tasks each worth up to `10⁹` put the total at
about `10¹⁴`, past 32-bit range: the accumulators are 64-bit (`long
long`, `long`, `i64`), and JavaScript's `Number` is exact because the
bound sits comfortably below `2⁵³ ≈ 9 × 10¹⁵`.

**Complexity:** `O(W + T log T)` time, `O(T)` space.
