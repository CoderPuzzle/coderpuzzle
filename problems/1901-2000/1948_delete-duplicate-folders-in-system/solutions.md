# Solutions — Delete Duplicate Folders in System

## Trie with Deduplicated Subtree Signatures

Two folders are identical when their subtrees are isomorphic including folder names, so the natural representation is a trie of the paths, and duplicate detection becomes subtree-identity detection. The canonical trick is to give every node an integer signature in post-order: a node's signature is the sorted tuple of `(child name, child signature)` pairs, two nodes receiving the same signature id if and only if their child maps are identical. Sorting makes the tuple order-independent, and because children are identified by name, the comparison includes structure all the way down.

The implementation builds the trie from the paths, collects all nodes with a stack, and processes them in reverse collection order — since parents are always collected before their children, the reversal is a valid post-order in which every child has a signature before its parent needs it. A `sig_counts` map records how many nodes share each signature. Marking is then a single rule: any node with at least one child whose signature occurs two or more times is a duplicate, and its entire subtree is marked for deletion. Leaf folders are deliberately exempt — a folder with no subfolders can never count as a duplicate under the problem's "non-empty set of identical subfolders" definition, which is why the check requires `node["children"]` to be non-empty.

Two subtleties in the problem are honored exactly. Deletion happens once, so the marking pass runs entirely on the original tree — folders that would only become identical after removals (example 2's `/a` and `/c`) survive, which falls out of computing all signatures before deleting anything. And deleting a folder deletes its subfolders with it, covered by the stack-based subtree marking. Finally the surviving folders are collected by DFS with the running path as prefix, and the result is sorted to give a deterministic output.

**Complexity:** `O(P log P)` time where `P` is the total number of path components, `O(P)` space.
