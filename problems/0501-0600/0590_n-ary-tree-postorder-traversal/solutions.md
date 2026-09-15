# Solutions — N-ary Tree Postorder Traversal

## Frame stack emitting after the children

Postorder emits a node only after every descendant, so the walk keeps a
frame per open node — the node plus how many of its children have been
entered. A frame with an unvisited child pushes that child's frame; a frame
whose children are all closed emits its node and pops. The frames simulate
the recursive call stack exactly, but live on the heap, so a 1000-deep
chain or a 1000-wide group costs loop iterations instead of stack frames —
the follow-up's iterative requirement, met by construction.

Each node acquires exactly one frame, entered once and closed once; the
output order falls out of the frame lifetimes with no second pass or
reversal.

**Complexity:** O(n) time, O(n) space, where n is the number of nodes.
