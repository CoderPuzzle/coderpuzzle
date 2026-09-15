# Solutions — Sequence Reconstruction

Both approaches read the sequences down to the same raw material: every
consecutive pair inside a `sequences[i]` pins one precedence — `u` before
`v` — and the shortest supersequences are exactly the permutations of
`[1, n]` that respect every pinned pair, so the question is whether those
precedences admit `nums` and nothing else. Kahn's algorithm builds the
precedence graph and lets it emit its own order: a value is free to come
next once none of its pinned predecessors are left, and the order is forced
precisely when there is never more than one free value to pick. The
pinned-adjacency scan reads the same pairs from the other end — it walks
`nums` itself and asks which of its `n - 1` adjacent slots some pair pins,
since `nums` is forced exactly when all of them are.

## Kahn's algorithm

Each consecutive pair of a sequence pins one precedence, and nothing else in
the sequences constrains the order, so the pairs assemble into a graph — an
edge `u -> v` per pair — whose topological orders are exactly the
permutations of `[1, n]` that keep every sequence embedded: the shortest
supersequences. `nums` is the only shortest supersequence exactly when that
graph has a single topological order and the order is `nums` itself.

Kahn's algorithm makes uniqueness visible instead of checked. A value is
free to come next once every edge into it has been honored — once all its
pinned predecessors have been placed — and a run can only branch, stall, or
proceed: two free values at once could each take the next slot, so no order
would be forced; no free value means the remaining edges loop and no order
exists at all; otherwise the single free value is the forced next one. So
the run must hold exactly one free value at every step, and each forced
value must be `nums`'s next value — any deviation means `nums` is not the
one order the pairs admit.

The code first rejects any value outside `[1, n]` — `nums` could not
contain it, so it is not even a supersequence — then records one edge and
one outstanding-predecessor count per pair. Repeated pairs only pad a
count, and all copies of a pair are honored together when their source is
placed, so multiplicity changes nothing; a pair that runs backwards in
`nums`, or one pinned to a single value, surfaces the honest way — as an
ambiguous step, an order mismatch, or a count that never reaches zero. A
run of `n` forced picks, always in `nums`'s own order, is the answer.

**Complexity:** `O(total sequence length + n)` time, `O(total sequence length + n)` space.

## Pinned adjacencies

Every value of `[1, n]` must occur in a supersequence of `sequences`, so
none is shorter than `n`, and a supersequence of length `n` uses each value
exactly once — it is a permutation. A permutation embeds every
`sequences[i]` exactly when it keeps each consecutive pair of each sequence
in order, so all the sequences really pin is a set of pairwise precedences,
and the shortest supersequences are precisely the permutations that respect
them all.

Swapping two adjacent values of such a permutation changes nothing unless a
pinned pair orders them, so whenever some adjacent pair of `nums` is not
itself pinned — not seen as a consecutive pair inside some `sequences[i]` —
flipping it produces a second shortest supersequence. `nums` is therefore
the only shortest supersequence exactly when every one of its `n - 1`
adjacent pairs is pinned; an unpinned adjacency always means an alternative
order of the same length. For `n == 1` there are no adjacencies to pin and
the answer is trivially true.

The code scans each sequence once. A value outside `[1, n]`, or a pair that
runs backwards in `nums`, means its sequence never embeds in `nums` at
all — `nums` is then not even a supersequence — so the scan stops with
`false`. A pair may also skip ahead (`v` later than `u` but not immediately
after); that pins nothing new but stays consistent, while a pair with `v`
directly after `u` pins the adjacency slot between them. The method
finishes by checking that all `n - 1` slots were pinned.

**Complexity:** `O(total sequence length + n)` time, `O(n)` space.
