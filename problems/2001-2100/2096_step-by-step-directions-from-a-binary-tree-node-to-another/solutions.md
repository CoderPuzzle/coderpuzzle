# Solutions — Step-By-Step Directions From a Binary Tree Node to Another

## Record parents and meet at a common ancestor

Traverse the tree iteratively and record, for every value, its parent and whether it is that parent's left or right child. Walk upward from `startValue`, storing the distance to every ancestor. Then walk upward from `destValue` until reaching one of those ancestors, collecting each incoming `L` or `R` edge along the way.

The shared node is the lowest common ancestor. Its recorded start distance gives the required prefix of `U` moves, and reversing the directions collected from the destination gives the downward suffix. All traversals are iterative so a legal 100,000-node chain does not consume the runtime call stack.

**Complexity:** `O(n)` time and `O(n)` auxiliary space.
