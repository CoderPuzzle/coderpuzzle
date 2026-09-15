# Solutions — The Earliest Moment When Everyone Become Friends

Both rest on the same monotone fact: links never disappear, so replaying
the logs soonest-to-latest can only fuse groups, never split them. The
bisection treats the sorted timeline as an answer space — the question "do
the `k` soonest logs leave one group?" flips from no to yes exactly once,
and binary search finds that flip, paying a fresh connectivity probe per
step. The incremental replay walks the timeline once instead, fusing groups
as each event arrives and stopping at the first fusion that leaves a single
group, so no probe ever repeats work an earlier step did.

## Bisect Connectivity

The answer, when it exists, can only be an event's own moment:
connectivity changes solely when a link arrives, so the earliest
fully-connected instant is the time of some event. Sorting the logs by
moment therefore lines up every candidate answer, and the task becomes
finding the first position in that line where all `n` elements form one
group.

That position is what a monotone predicate bisects. Links never disappear,
so once the first `k` logs connect everything, the first `k + 1` do too —
"is the prefix of length `k` connected?" is false up to a boundary and true
from it on, exactly the shape binary search consumes. The code keeps an
inclusive range of prefix lengths and probes the middle with a throwaway
union-find: a fresh `parent` array, fusing along the first `k` logs,
watching the component counter. A probe on the full length settles `-1`
before the search starts; once the range collapses, the last event of the
surviving prefix carries the answer — in Example 1 that prefix is three
logs long, so the time-7 link is reported.

The template's price is repetition — every probe rebuilds connectivity from
nothing, so the logs are re-scanned about `log E` times where a single
replay would touch each once. Each scan is near-linear, though, so the
whole search still lands inside the sort's `O(E log E)` budget: the same
asymptotics as the one-pass method, with constant work traded for the
generality of the answer-space pattern.

**Complexity:** `O(E log E)` time, `O(n)` space, for `E` logs over `n`
elements.

## Union-Find over Sorted Logs

Acquaintance spreads exactly like connectivity: processing the friendship events in time order and merging the two endpoints' components models the social group faithfully, and everyone is acquainted precisely when the component count reaches one. So the task reduces to replaying events chronologically and reporting the timestamp of the merge that closes the last divide — a union-find problem.

The code sorts the logs by timestamp (the default tuple order puts the timestamp first), then folds each event into a union-find structure with path-halving finds. A counter starts at n components; every union of two distinct roots decrements it, redundant events (already-friends pairs, like the 20190224 log in the example) change nothing, and the loop returns the instant the counter hits 1. If the logs are exhausted first, no such moment exists and -1 is returned.

The component counter avoids any per-step global scan over all n people, so each event costs near-constant amortized time and the sort dominates. Edge cases: timestamps are guaranteed unique so no two events vie for the same moment, and even a fully connected history returns at the event that completes the tree rather than at the end.

**Complexity:** `O(E log E)` time, `O(n)` space, for E logs over n people.
