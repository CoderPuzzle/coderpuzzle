# Solutions — Employee Importance

## Hash-indexed stack walk

The subordination structure is a tree keyed by employee ID, but the input is a
flat array in no particular order, so the first job is to make the tree
walkable: one pass builds a hash map from each ID to its employee record. After
that the query is a traversal — start at the given ID and sum the importance of
every reachable node through direct and indirect `subordinates` links.

The traversal uses an explicit stack of pending IDs rather than recursion. Each
pop adds one employee's importance and pushes that employee's direct
subordinates; the stack drains exactly when the whole subtree has been counted.
Recursion would compute the same sum, but the input allows a 2000-employee
chain — one subordinate per level — whose 2000 nested calls ride past the
call-stack limits some language runtimes impose, while the explicit stack is a
plain heap-grown container that never touches the call stack at any depth.

Each employee enters the stack exactly once because the constraint "one
employee has at most one direct leader" makes the reachable structure a tree —
no ID can be pushed from two different parents. Importance values may be
negative, so the running total is a plain signed sum with no clamping; the
worst magnitude (2000 employees at 100 each) fits comfortably in 32 bits.

**Complexity:** `O(n)` time for the index pass plus one visit per reachable
employee, and `O(n)` space for the hash map and the stack.
