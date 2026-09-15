# Solutions — Find All The Lonely Nodes

## Stack walk testing each node's two children

Loneliness is a local property of a parent: exactly one of its two child
slots is filled. So one traversal suffices — visiting a node, checking
whether it has precisely one child, and recording that child's value when
so. The root has no parent and is never recorded, which falls out of
starting the checks at the root's children rather than at the root
itself... or, as here, by testing every visited node's children while
walking, so the root is only ever a parent in the test, never a subject.

The walk uses an explicit stack of nodes (the tree may be a 1000-deep
chain, beyond safe recursion depth in the stricter runtimes). Each pop
examines the node's left and right pointers: if exactly one exists, its
value joins the answer; both existing children are pushed for later.
Order of recording is traversal order, and since the statement accepts
any order the judge compares the sorted result.

**Complexity:** `O(n)` time, `O(h)` space for the stack.
