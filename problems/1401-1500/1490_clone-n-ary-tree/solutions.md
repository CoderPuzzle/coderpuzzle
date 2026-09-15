# Solutions — Clone N-ary Tree

Copying a tree is one traversal: every node is visited exactly once, and
the only real question is where each copy's children come from. The
recursive walk answers that structurally — a child's copy is whatever
copying that child returns — while the level-order walk answers it through
a registry that remembers which clone belongs to which original.

## Recursive copy

The empty tree clones to nothing. Anything else clones node by node: make
a fresh node holding the original's value, then fill its children with the
clones the recursive calls return for the original's children. Since a
child is reachable only through its parent, every node is copied exactly
once and no registry is needed — the call stack itself tracks which copy
belongs to which original. Children are copied in order, so sibling order
survives. The recursion runs as deep as the tree, and a 1000-deep chain
nests 1000 calls, which the code must allow for.

**Complexity:** `O(n)` time, `O(n)` space — every node is visited once,
and the call stack grows with the tree's depth, up to `O(n)` for a chain.

## Level-order copy with a clone registry

The same walk driven by a queue instead of the call stack: dequeue an
original, create its clone, record the pair in a registry keyed by the
original node, then hand the clone the registry entries of the original's
children and enqueue those children. Copying and wiring stay in one pass
because a child's clone exists by the time its parent needs it. The
registry is also what makes the approach general: nothing in the loop
depends on the tree shape, and the same code clones a graph — shared or
cyclic structure included — where a plain structural copy would never
terminate (the follow-up).

**Complexity:** `O(n)` time, `O(n)` space — every node is copied once, and
the registry, the queue, and the clone itself are all linear in the nodes.
