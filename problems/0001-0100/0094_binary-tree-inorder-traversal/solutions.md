# Solutions — Binary Tree Inorder Traversal

Both walks read the same order — every left subtree before the node that
anchors it, every right subtree after — and both answer the follow-up's
loops-alone demand; they differ in where the walk keeps the path back up.
The explicit stack owns that memory outright: ancestors wait on a stack
until their right sides come due, and the walk pays space for each of
them, the tree's height in the worst case. Morris threading does away
with the storage rather than relocating it — not another dodge around
recursion, but a different answer to where the return trip lives: the
walk lays a temporary thread down the tree's own right pointers, lets
the thread steer it home, and cuts it again, so two pointers are all
the memory it ever holds.

## Iterative inorder with an explicit stack

The recursive formulation of inorder traversal walks left, visits, then walks right, and the recursion itself remembers the path back up. Doing it iteratively means owning that memory explicitly: a stack of nodes plays the role of the call stack, holding exactly the ancestors whose left subtrees are still being descended into, while a cursor `node` names the next subtree to process. The loop runs while either operand of the traversal remains — a subtree to enter or an ancestor to come back to.

Each round starts by descending the left spine: the inner loop pushes every node it passes and steps left until it falls off the tree. That makes the stack top the leftmost unvisited node of the current subtree; popping it yields the next value in inorder order. The cursor then jumps to the popped node's right child, so that entire right subtree is traversed — by the very same rules — before any ancestor below it on the stack is visited. Empty tree, single node, and skewed chains all fall out of the invariant with no special cases, and nothing recurses, so a deep chain cannot overflow any call stack.

**Complexity:** `O(n)` time — each node is pushed and popped exactly once — and `O(h)` space for the stack, where `h` is the tree's height: `O(n)` worst case for a skewed chain, `O(log n)` for a balanced tree.

## Morris threading

The stack and the call stack are the same memory in two costumes, and
Morris threading does away with the memory itself. The observation it
turns into machinery: when a walk that has just finished a node's left
subtree needs to come back to the node, the return address is already
implied by the tree — the rightmost node of that left subtree is the
node's inorder predecessor, and at that moment its right pointer is
free. So before descending left, the walk threads that predecessor's
right pointer back to the node, and the tree, not a stack, carries the
path back up.

Each round hunts the predecessor first: step to the left child, then
down right pointers until they run out — or until one lands back on the
node itself, the signature of an already-planted thread. No thread means
fresh ground: lay the thread and descend left, planning to return. A
thread pointing home means the left subtree is finished: read the node's
value, cut the thread so the tree keeps every pointer it came with, and
step right. A node with no left subtree is simply read and stepped
right. Each thread is laid once and cut once, and every edge is walked
at most twice — once descending, at most once more across a thread — so
the walk stays linear while holding nothing but the cursor and the
predecessor it is currently hunting.

This is deliberately not a second answer to the follow-up: the stack
already walks with loops alone, and Morris swaps out no recursion — what
it swaps out is the auxiliary stack, the one thing the iterative walk
still carries. The price is honest work instead of memory: hunting each
predecessor re-walks a right spine the descent has seen or will see, and
the pointers it rewrites are the tree's own, restored thread by thread —
when the walk ends, every thread is cut and the tree is exactly the tree
it started as.

**Complexity:** `O(n)` time — each edge is walked at most twice — and
`O(1)` space: the cursor and the predecessor of the moment are the only
storage.
