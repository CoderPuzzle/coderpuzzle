# Solutions — Smallest Subtree with all the Deepest Nodes

What shape can the answer have? The deepest nodes are all leaves sitting at
one common depth, and the smallest subtree containing them is rooted at
their lowest common ancestor — anything higher drags in extra nodes,
anything lower misses one of them. The single solution below measures
subtree heights from the bottom up and hands back exactly that ancestor.

## Bottom-up heights on an explicit stack

The judging rule falls out of heights. At a node whose children's subtrees
are equally deep, each side reaches the subtree's deepest level, so its
deepest nodes sit on both sides and no proper descendant covers them all —
the node itself is the subtree's answer. When one side is strictly deeper,
the subtree's deepest level is reachable only through that child, so no
deepest node can live in the shallower side and the deeper child's answer
passes through unchanged. A leaf bottoms the induction out: both absent
children have height 0 — equal — so a lone deepest leaf answers itself.
Because judging a node needs both children's heights, the walk is
post-order, children before the node.

The answer bubbling out of a merge is always the lowest common ancestor of
that subtree's deepest leaves: the rule re-roots exactly where those leaves
split into both sides, and passing through above leaves the chosen node
untouched. What emerges from the root is therefore the lowest common
ancestor of the tree's deepest leaves — the asked-for subtree, and a forced
one, since that ancestor is unique.

The traversal carries its own stack of `(node, measured)` frames instead of
recursing: the first pop of a frame schedules the node's merge beneath its
two children, and the second — which can only fire once both subtrees are
fully measured — performs it, recording the height and the propagated
answer in per-node maps. The tree may be a single 500-node chain, whose
recursion would nest ~500 calls — inside CPython's default 1000-frame
budget but needlessly spending half of it, and every other runtime's stack
with it — so the walk iterates. Each node enters and leaves the stack
exactly twice.

**Complexity:** `O(n)` time, `O(n)` space.
