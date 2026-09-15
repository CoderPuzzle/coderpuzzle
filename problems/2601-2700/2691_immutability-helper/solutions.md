# Solutions — Immutability Helper

## Proxy with Copy-on-Write

`produce` wraps the original object's root in a `Proxy` whose `get` handler
returns a lazily-created proxy for every object-valued property, so the
mutator can navigate and edit arbitrarily deep without anything being
copied. The `set` handler never touches the target: it records the write in
a per-node "shadow" — a map from each original node to the keys the current
`produce` call has overwritten or added. Reading consults the shadow first,
which is why a later statement in the same mutator sees an earlier one's
edit, exactly as a mutable draft would behave.

When the mutator returns, `materialize` walks the original tree and rebuilds
only what changed: a node with a non-empty shadow, or one on the path down
to such a node, is copied with its overridden keys spliced in; every other
subtree is returned as the original reference itself, so unchanged branches
are structurally shared instead of cloned. The shared-subtree memo makes the
walk linear in the size of `obj`, and the originals are never written, so
repeated `produce` calls each start from the pristine source — two calls
that make opposite edits yield independent results, as the first example
shows.

**Complexity:** `O(n)` time, `O(n)` space (n = nodes in `obj`; the copies
touch only the edited spines, the shadow map holds only written keys).
