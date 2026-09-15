# Solutions — Copy List with Random Pointer

## Clone map over node identity

A deep copy must allocate exactly one fresh node per original and rewire both
`next` and `random`, and the random pointers make node identity matter: two
nodes with the same value are still different nodes, so a copy that shares or
duplicates one is caught, not forgiven. The solution records a map from every
original node to a freshly allocated clone, keyed by node identity (the node
object itself, a pointer, or its allocation address — never the value, since
values repeat freely). The canonical form fills the map in one pass over the
`next` chain, then wires each clone's `next` and `random` in a second pass,
looking every target up in the map.

Filling before wiring is what makes the lookups total: by the time any pointer
is copied, every clone already exists. The same map also serves a memoized
recursive walker — create the clone on first visit, register it immediately,
then descend into `next` and `random` — where early registration is exactly
what terminates the walk when random pointers reach backwards. Both shapes are
bounded by `n <= 1000` nodes, so neither the explicit loops nor the recursion
depth can grow past a thousand frames.

The judge reads the copy back as `[val, random_index]` rows and additionally
verifies the copy shares no node with the input, so handing back any original
node fails loudly rather than silently.

**Complexity:** `O(n)` time and `O(n)` space for the clone map, with one
allocation per node and constant work per pointer.
