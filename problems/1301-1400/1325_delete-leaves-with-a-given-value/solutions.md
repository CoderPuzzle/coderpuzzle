# Delete Leaves With a Given Value

## Approach: Iterative post-order prune

Whether a node survives depends on its children first: only after both
subtrees have been pruned can the node itself be judged — it dies exactly
when both pruned children are gone and its value equals the target. A
post-order traversal therefore prunes the whole cascade in one pass; the
deletion of a child can turn its parent into a target leaf, and the parent
is judged right after, so no repeated sweeps are needed.

The traversal is an explicit two-phase stack (push to expand, push again
to judge) rather than recursion — the tree may be a 3000-node chain, past
every language's default recursion budget. Each node is processed twice.

![Post-order prune on root=[1,2,3,2,null,2,4] with target=2: the two leaf 2s are judged and die first, which exposes their parent 2 as a childless target leaf that dies in the same pass, leaving [1,null,3,null,4].](figures/solution-postorder-prune-cascade.svg)

**Complexity:** O(n) time, O(h) stack space with h the tree height.
