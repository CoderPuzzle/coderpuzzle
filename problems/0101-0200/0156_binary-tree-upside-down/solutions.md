# Solutions — Binary Tree Upside Down

## Iterative rotation down the left spine

The guarantee that every right node is a leaf with a left sibling pins down the tree's whole shape: it is a single left spine where each spine node may carry one right leaf. That turns the "level by level" instruction into a simple local rule for each spine node — its right sibling becomes its new left child, its parent becomes its new right child — and the rule never mentions the subtrees hanging off, because nothing else hangs off. The leftmost spine node, which has neither sibling nor parent to inherit, ends up as the new root, so a single descent down the spine performs the entire flip.

Three pointers walk the spine: `node` is the spine node being rotated, `parent` its original parent, `sibling` its original right sibling. Both of `node`'s original links must be saved before they are overwritten — the left child continues the walk, and the right child is precisely the sibling the next spine node will adopt. Then the two rule-writes land, and the saved values roll into `parent` and `sibling` for the next round. When the walk falls off the end, `parent` holds the leftmost node: the new root. The empty tree needs no special case (the loop never runs and `None` is returned), and the original root degenerates into the tail of the new right spine — its new left is the initial `None` sibling, its new right the `None` parent it never had.

Nothing is allocated and no stack is kept; nodes are only relinked, so the rotation happens in place and the flipped tree reuses every original node. The same three-pointer loop is the solution in all seven languages; in Rust, where nodes are owned `Box`es rather than shared pointers, the two writes become ownership moves — each child is `take`n out and handed to its new parent — with the algorithm unchanged.

**Complexity:** `O(n)` time — one rotation per spine node — and `O(1)` extra space.
