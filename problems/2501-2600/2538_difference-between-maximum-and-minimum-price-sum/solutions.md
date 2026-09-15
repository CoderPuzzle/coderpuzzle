# Solutions — Difference Between Maximum and Minimum Price Sum

## Rerooting DP over maximal arms

Two observations collapse the problem. First, once a tree is rooted, a
path starting at the root is forced to descend (a tree has no way back),
so the minimum path at any root is always the lone root itself. Second,
subtracting that constant minimum from the maximum means each root's
price cancels out of its own cost — what remains is "the largest _arm_",
an oriented vertical path whose starting node is adjacent to the root and
whose prices alone make up the sum. So the answer is simply the best arm
over all orientations of the tree, no per-root enumeration needed.

One rerooting pass computes it in linear time. Root the tree at node 0
with an explicit BFS order (no recursion, so depth never matters), then a
reverse sweep fills `d[v]`, the best downward arm inside `v`'s subtree.
Each node also keeps its top two child arms, because during the forward
sweep every node must be handed the best arm among all directions except
its own branch back upward — excluding exactly one child is what the
second-best value buys. The final answer is the largest `d[v]` or
climb-up value seen anywhere.

The bound check: a path price sum is at most `n · max(price)` =
10⁵·10⁵ = 10¹⁰, which overflows 32-bit integers — Java uses `long`,
C++/Go/Rust widen to 64-bit accumulators — while JavaScript Numbers stay
exact because 10¹⁰ sits far below the 2⁵³ exactness threshold.

**Complexity:** `O(n)` time, `O(n)` space.
