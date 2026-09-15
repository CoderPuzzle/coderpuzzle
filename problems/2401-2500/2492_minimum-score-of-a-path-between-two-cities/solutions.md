# Solutions — Minimum Score of a Path Between Two Cities

The score of a path is the minimum road distance on it, and a path may
reuse roads and revisit cities. That freedom collapses the problem to a
single connected-component question: which roads lie inside city 1's
component? The traversal answers it by walking — an adjacency list plus
one flood out of city 1 marks every reachable city, and the marked
roads are the candidates. Union-Find answers it without building the
graph at all, merging endpoints as the road list streams past and then
comparing roots against city 1's.

## Flood fill from city 1

A path may cross the same road as often as it likes, so being able to
reach a road is the only thing that matters: when both its endpoints
sit in city 1's component, a path from 1 to n can detour across it and
inherit its distance as the score. Finding that component is a plain
reachability question, and the most literal answer is to walk it.

Build the undirected adjacency list first — each road appended at both
of its endpoints, so the walk can cross it in either direction — then
flood outward from city 1. The flood runs on an explicit stack rather
than recursion: with up to 10⁵ cities a chain-shaped graph would drive
a recursive descent straight into the language's frame limit. Popping a
city reads its adjacency list, and every unmarked neighbor is marked
and pushed at once; marking at push time keeps a city from ever sitting
twice on the stack, so each city is popped once and each adjacency
entry is read once.

What remains is a single scan of the roads. A road joins its own two
endpoints, so they always share a component: testing the first endpoint
alone decides the pair, and the smallest distance among the roads the
flood reached is the answer. The guarantee that some path from 1 to n
exists puts n in that same component, so at least one road qualifies.

**Complexity:** `O(n + m)` time, `O(n + m)` space for the adjacency
list, the marks, and a stack that peaks at all `n` cities, where `n` is
the number of cities and `m` the number of roads.

## Minimum edge inside city 1's component

Because any road can be traversed repeatedly, every road in the
connected component that contains city 1 can be incorporated into a
valid path: travel from 1 to one endpoint, cross the road, and return
along the same route — the reused edges only ever contribute a score of
their own minimum, which cannot hurt. The best possible score is
therefore the smallest distance among all roads whose two endpoints lie
in city 1's component (the constraint that a path from 1 to n exists
puts n in that same component). The score of the path itself is
unaffected by the detour edges used to reach a candidate road, so the
minimum over the component is achievable and clearly a lower bound.

Union-Find realizes this directly: union the endpoints of every road,
then locate the root of city 1 and scan the roads once, keeping the
smallest distance among those that stay inside that root's component.
Both the union pass and the final scan are linear in the number of
roads, with the disjoint-set operations near-inverse-Ackermann amortized.

**Complexity:** `O(m · α(n))` time, `O(n)` space, where `n` is the
number of cities and `m` the number of roads.
