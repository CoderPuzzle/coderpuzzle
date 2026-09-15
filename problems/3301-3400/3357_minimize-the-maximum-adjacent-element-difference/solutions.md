# Solutions — Minimize the Maximum Adjacent Element Difference

Only adjacent pairs constrain the answer, so a missing cell matters only
through its maximal run of -1s: cells inside a run never touch a known
value other than the run's two boundary values. That shrinks each probe to
the runs and their boundaries.

## Binary search on d with two fill shapes

Feasibility of a difference d is monotone — any fill achieving d also
achieves every larger d — so binary search d. A probe first checks the
unchangeable adjacent known pairs. Then order the chosen pair as x ≤ y and
look at each run between lo ≤ hi: the run is satisfied when one of x, y
lies within d of BOTH ends (fill the whole run with that value), or — when
the run has two or more missing cells — by a straddle: x within d of lo,
y within d of hi, and |x − y| ≤ d for the single x↔y handoff (a one-cell
run has no handoff, so it always needs a common value). "Far" mode lets
the two values float freely and asks whether every run's both-end interval
[hi − d, lo + d] — plus every boundary run's [v − d, v + d] — can be
stabbed by two points, checked with the classic right-endpoint greedy.
"Close" mode constrains y − x ≤ d and slides the pair over candidate
positions (interval endpoints and endpoints shifted by d, where the
predicate can only change): once x is fixed, every uncovered run leaves y
exactly one interval — the straddle window [hi − d, hi + d] if x reaches
lo, else the both-end interval — and those intervals intersect in a single
sweep. Either mode succeeding makes d feasible.

The search runs over [0, max(knowns) − min(knowns)], always feasible
(min(knowns) stabs every interval), so the answer stays below 10⁹ and fits
a 32-bit return. The probe's interval arithmetic reaches ~4·10⁹, past
32-bit: fixed-width languages carry it in 64-bit integers, while JS Number
stays exact, the magnitudes being far below 2⁵³.

**Complexity:** `O(n + r² · log V)` time, `O(r)` extra space, where r is
the number of missing runs and V = 10⁹.
