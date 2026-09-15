# Solutions — Loud and Rich

Both methods read the same ground fact: each pair `[a, b]` in `richer` points
from a wealthier person to a poorer one, so the people definitely at least as
wealthy as `x` are exactly `x` plus its ancestors in that directed acyclic
graph, and the argmin over that set is unique because every `quiet` value is.
The memoized DFS answers each person's question directly and shares the work
through the recursion — a person settles once, and every poorer colleague
pointing at it then reuses the settled answer. The Kahn sweep derives the very
same answers from the other end, settling persons from the known-richest
downward and letting each settled answer flow to everyone poorer; both touch
every person and pair a constant number of times.

## Memoized DFS up the richness DAG

The ancestor-set observation becomes a recurrence between neighbors. Suppose
each direct richer neighbor `a` of `x` already knows the quietest person among
`a` and all of `a`'s ancestors. Then `x`'s answer is the quietest of `x`
itself and those neighbors' answers: every ancestor of `x` sits above one of
its direct richer neighbors, so the fold covers `x`'s whole ancestor set
without ever materializing it. That self-reference over a directed acyclic
graph is exactly what a DFS with memoization solves.

The code builds the richer-neighbor adjacency — the reverse of the edges the
sweep below walks — starts every person with itself as the provisional
answer, and explores richer edges from each not-yet-settled person with an
explicit stack of `(person, next neighbor)` frames, so no input chain can
deepen the call stack. Descending does nothing but push unsettled richer
neighbors; skipping the settled ones is the memo, and it is why each person
enters the stack exactly once. A frame finishes when its neighbors are
exhausted: the person then folds each direct richer neighbor's settled answer
into its own, keeping the candidate whose quiet score is smaller, and marks
itself settled for the frames waiting below.

Each person is pushed once and each pair is read once on the way down and
once on the way up, so the walk is linear in the input; the adjacency, the
stack, and the answer array are each bounded by `n` persons plus `m` pairs.

**Complexity:** `O(n + m)` time, `O(n + m)` space.

## Kahn sweep down the richness DAG

Each pair `[a, b]` in `richer` is a directed edge from a richer person to a
poorer one, so the people who definitely have equal to or more money than `x`
are exactly `x` plus its ancestors in that directed acyclic graph — the
statement's logical-consistency guarantee is what makes the relation acyclic,
and the argmin over that set is unique because every `quiet` value is. Rather
than re-deriving the whole ancestor set for every person, the sweep settles
persons from the known-richest downward and lets each settled answer flow to
everyone poorer.

The code first builds the richer-to-poorer adjacency with a `pending` counter
per person — how many directly richer persons have not yet relaxed into it —
and seeds a worklist with everyone whose count is zero: persons nobody is
known to outrank, whose answer is themselves. Each settled person `x` then
relaxes into every directly poorer neighbor `b`, replacing `answer[b]` with
`answer[x]` whenever `quiet[answer[x]]` is smaller, and decrements `b`'s
counter; a person joins the worklist exactly when its counter hits zero, so
by the time `b` is settled every richer person above it has already relaxed a
final, fully-inherited answer into it. That induction is why a single
candidate per edge suffices — the quietest person among `b` and its direct
richer neighbors transitively covers every ancestor.

Each person and each pair is touched a constant number of times, so the sweep
is linear in the input; the adjacency, counters, worklist, and answer array
are each bounded by `n` persons plus `m` pairs.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
