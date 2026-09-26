# Solutions — Count Non Adjacent Subsets in a Rooted Tree

## Tree DP by selection state

For every node, keep two residue-count arrays: `dp0` counts subsets of its
subtree that do not select the node, and `dp1` counts subsets that do select
it. The empty subtree option is represented by `dp0`, while `dp1` starts with
only the singleton subset.

Merge each child with a convolution of residues. When the parent is selected,
only child states that do not select the child are allowed. When the parent
is not selected, either child state may be used. Subtract the empty subset at
the root.

![On the chain 0-1-2 with nums=[1,2,3], k=3, the residue-count arrays merge
bottom-up — a selected parent takes only unselected child states — leaving
dp0[0]=[2,0,1] and dp1[0]=[0,2,0], so the answer is 2 + 0 − 1 = 1, the subset
{2}.](figures/solution-tree-dp-residue-merge.svg)

**Complexity:** `O(n * k²)` time, `O(n * k)` space.
