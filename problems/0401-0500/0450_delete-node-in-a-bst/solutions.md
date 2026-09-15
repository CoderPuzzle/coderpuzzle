# Solutions — Delete Node in a BST

## Recursive Search with Successor Replacement

Deletion descends the tree using the BST ordering — left when `key < node.val`, right when `key > node.val` — rewriting the child pointer from each recursive call so the tree is relinked on the way back up. If the search falls off the tree (key absent, or an initially empty tree), the recursion returns None and nothing changes.

Once the target node is found, three cases apply. A node with no left child is replaced by its right child, and a node with no right child by its left; both cover the leaf case, where both children are None and the node simply vanishes. These splices preserve the BST property because an entire subtree is lifted into the deleted node's position, keeping every element on the same side of every ancestor.

The two-children case is the interesting one: the node's value is replaced with its in-order successor's value — the minimum of the right subtree, found by walking left from the right child until the leftmost node. That value is by construction greater than everything in the left subtree and no greater than every other element of the right subtree, so planting it at the node keeps the ordering intact. The duplicate (the successor itself) is then removed by recursing into the right subtree with the successor's value; that call always lands on a node with no left child, so it terminates in one of the easy splice cases.

![The example BST before and after deleting key 3: the amber node has two children, its in-order successor 4 (accent) is the leftmost node of the right subtree, and 4's value takes 3's place in the same node.](figures/solution-successor-replacement.svg)

Each value along the search path is examined once, and the successor walk plus the follow-up deletion together stay within a single root-to-leaf band of the tree, so the cost is proportional to the height. A skewed chain of 10^4 nodes is the worst case for both time and recursion depth.

**Complexity:** `O(h)` time, `O(h)` space for the recursion stack, where h is the height of the tree.
