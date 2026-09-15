# Solutions — Complete Binary Tree Inserter

Where the next node belongs is never a mystery: in a complete tree the
level-order positions are packed, so the next free slot has a fixed
address, and its parent is simply the leftmost node that still has a
free child. The only question is how to hold that parent ready in
constant time.

## Level-order frontier of open slots

The constructor makes one breadth-first pass over the tree and collects,
in a FIFO queue, every node with at least one free child slot. BFS
visits parents left to right, and in a complete tree the not-yet-full
nodes are exactly a suffix of one level followed by the next level's
leaves — so queueing them in visit order makes the queue front the
parent of the next complete position by construction. Nodes that are
already full never enter, which is what keeps the queue short: it holds
at most the boundary of the tree, one level's worth of nodes.

`insert(v)` then touches nothing but the front: the fresh node fills the
front parent's missing child, left before right, and the parent's value
is the answer. Queue maintenance is two local moves — a parent whose
right slot just filled can take no more children, so it leaves, while
the fresh node has two free slots and joins at the back. The order never
drifts: induction on the inserts shows the queue always holds the open
parents in level order, which is precisely the left-first rule
completeness demands. Each node enters the queue once and leaves at
most once, so across all inserts the queue work amortizes to constant.
`get_root()` just hands back the root stored at construction; the
inserts attached children into the live tree, so it is always current.

**Complexity:** `O(n)` build, `O(1)` amortized per insert time, `O(n)` space.
