# Solutions — Find Duplicate Subtrees

## Post-Order Serialization

Two subtrees are duplicates exactly when they have identical structure and values, which is precisely when they serialize identically. The solution builds a canonical string for every subtree in a post-order walk — the node's value joined with the serializations of its left and right children, with a `"#"` marker for null children. The null markers matter: without them, trees with different shapes could produce equal strings.

Because a parent's serialization is assembled from its children's, every subtree gets its key in a single traversal, and each key is a complete, unambiguous description of the subtree below that node. A hash map from serialization to an entry `[first node, latest preorder index, count]` tallies occurrences: the first node seen with a given key is stored (and is the one reported), while later occurrences only bump the count and refresh the index. A subtree is a duplicate exactly when its key's count reaches two, and one root per duplicate kind is returned, as the problem allows.

![The example tree: the boxed 2(4) subtree and the dashed 4-leaf nodes serialize identically to earlier subtrees.](figures/solution-duplicate-subtrees.svg)

The preorder index makes the output deterministic: duplicates are emitted sorted by the most recent preorder position of their kind. After the traversal, entries with count at least two are filtered and ordered by that index.

The cost is dominated by string construction. Concatenating child serials copies them, so a degenerate chain-shaped tree — where serials grow linearly with depth — makes the total character work quadratic. That is the honest worst case for this style of solution, though typical bushy trees are far cheaper; the map also stores every distinct serial, giving the matching space bound.

**Complexity:** `O(n^2)` time, `O(n^2)` space in the worst case.
