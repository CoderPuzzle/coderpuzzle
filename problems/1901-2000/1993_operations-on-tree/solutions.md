# Solutions — Operations on Tree

The three operations touch exactly two neighbourhoods of a node — its
ancestor chain and its descendant subtree — so the whole data structure
is a plain tree stored both ways.

## Owner array plus children adjacency

The constructor keeps the parent array untouched, allocates a parallel
`owner` array (per node, `-1` meaning unlocked), and derives a children
adjacency list from the parent array once, so both directions of the tree
are reachable in a single hop. `lock` and `unlock` become single-slot
reads and writes of `owner`: the only real work is checking who owns the
node, which is exactly what the statement asks.

`upgrade` is the interesting case. It first rejects a node that is itself
locked, then walks the ancestor chain to prove no ancestor is locked, then
collects every descendant with an explicit stack over the children lists
to establish that at least one is locked. The stack — never recursion —
keeps the 2000-node chain well within the runtime's stack budget. When all
three conditions hold, the node is assigned to the caller and every
collected descendant is reset to `-1`, which is precisely the "unlock all
of its descendants" contract; locks elsewhere in the tree are untouched.

With `n <= 2000` and at most 2000 calls, even the linear walks inside
`upgrade` stay comfortably within budget, so the design optimizes for
clarity rather than asymptotic cleverness.

**Complexity:** `O(n)` time worst-case per `upgrade` (ancestor chain plus
descendant subtree), `O(1)` per `lock`/`unlock`, `O(n)` space.
