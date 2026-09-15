# Solutions — Binary Tree Right Side View

Both walks lean on the same observation: the right edge shows one node
per depth, and a traversal only has to be arranged so that, depth by
depth, the right one arrives first. The breadth-first sweep lets level
order do the arranging — each round drains one level left to right, so
the level's last value is the visible one, paid for with a queue
buffering that whole level. The depth-first walk goes after the visible
node directly: it tries the right child before the left, so the first
node it reaches at any depth is that depth's rightmost, and every later
arrival at the same depth sits further left and can be ignored. Keeping
only each depth's first-seen value builds the view top to bottom, with
nothing buffered beyond one root-to-leaf path.

## Breadth-first search, last node of each level

Seen from the right, a tree shows exactly one node per depth: the rightmost node at that depth. A queue makes that definition literal — when a round of the outer loop begins, the queue holds exactly one level's nodes, left to right. Each round fixes that count up front, drains exactly that many nodes off the front while appending their children at the back, and so hands the next level, intact, to the following round. Fixing the count is what keeps children enqueued mid-round from bleeding into the current level.

Because a round already produces its level left to right, the level's last value is the one the right side sees, so the method simply appends it to the answer and discards the rest. No special cases: an empty tree never enters the loop and returns `[]`, and a left-skewed tree needs no adjustment — its levels are singletons, and the left chain is simply what the right side sees.

**Complexity:** `O(n)` time — every node enters and leaves the queue exactly once — and `O(n)` space for the queue and the per-level buffers.

## Depth-first search, first node of each depth

Preorder is a matter of convention — nothing forces the left child to go
first. Explore the right child before the left and each depth's nodes
are visited strictly right-to-left: everything hanging in a right
subtree at some depth is reached before anything hanging in the sibling
left subtree at that depth. The first node the walk touches at each
depth is therefore exactly the rightmost one there — the node the right
edge sees — and every later touch at that depth sits further left and
is worth nothing to the view.

The implementation keeps an explicit stack of `(node, depth)` frames —
no recursion, so a skewed chain cannot deepen the call stack — and
pushes the left child before the right, leaving the right child on top
to pop first. A value is recorded only when its depth is new, deeper
than anything recorded so far, which happens exactly on that first
touch; the view fills top to bottom with no map and no per-level
buffer, and an empty tree starts with an empty stack and returns `[]`.

**Complexity:** `O(n)` time — every node is pushed and popped exactly
once — and `O(h)` space for the stack, which never holds more than one
deferred left child per depth, against the sweep's `O(w)` queue for a
whole level.
