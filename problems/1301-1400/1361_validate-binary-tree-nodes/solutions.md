# Validate Binary Tree Nodes

## Approach: In-degree audit, then one BFS from the root

A valid rooted binary tree needs three structural facts. Every node has at
most one parent — an in-degree over all child pointers catches shared
children, self-loops, and a node appearing as both children of one parent.
Exactly one node has no parent — anything else means several components or
a pure cycle with no entry point. And every node must be reachable from
that unique root — one BFS over the child pointers, comparing the visited
count against n, rejects cycles hanging off the tree or unreachable
components.

Together these conditions are also sufficient: at most one parent per
node plus a single root forces n - 1 parent edges, and full reachability
rules out both cycles and extra components.

**Complexity:** O(n) time, O(n) space.
