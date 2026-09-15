# Solutions — Employee Free Time

## Pool, Sort, and Sweep the Running End

A moment is commonly free exactly when no employee is busy, so the answer
depends only on the **union** of everyone's intervals — never on which
employee a piece came from. The `employeeFreeTime` method pools all
intervals into one list, sorts it by start (then by end), and sweeps once
while carrying `previous_end`: the furthest interval end seen so far.

An interval that starts strictly beyond `previous_end` exposes a gap —
everything before `previous_end` is covered and this interval proves nothing
covers `[previous_end, start]` — so `[previousEnd, start]` is emitted.
Otherwise the interval merges into the current busy block, and
`previous_end` becomes the running maximum of the ends: a long interval must
keep absorbing the shorter ones that start inside it. The strict comparison
is what makes touching intervals continuous: `[1, 3]` followed by `[3, 5]`
starts exactly at `previous_end`, not beyond it, so no zero-length or
split-at-a-point gap can appear. The infinite gaps before the first and
after the last interval never surface because the sweep has no interval to
trigger them.

Sorting pooled intervals costs `O(N log N)` for `N` total intervals (at most
`50 × 50 = 2500` here). The follow-up's k-way alternative — a min-heap over
each employee's list head — exploits that every list is already sorted and
pools them in `O(N log k)`; with `k ≤ 50` lists of length ≤ 50 the simpler
sort is the better engineering trade, and it is what all seven canonical
solutions implement identically (Python, Java, C++, Go, Rust, JavaScript,
TypeScript).

**Complexity:** `O(N log N)` time, `O(N)` space, `N` = total intervals.
