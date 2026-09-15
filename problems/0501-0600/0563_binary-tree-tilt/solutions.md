# Solutions — Binary Tree Tilt

## Post-order, tilt beside the sum

A node's tilt is the absolute difference of its two subtree sums — exactly the
two numbers a post-order walk has just finished computing beneath it, with a
missing child counting as 0. The same visit that reveals them also produces
the node's own subtree sum, its value plus both children's, which is the only
thing its parent needs. So one bottom-up pass settles every node exactly once:
add `|left - right|` to the running total, hand `val + left + right` upward,
done.

The walk carries an explicit stack of frames instead of recursing: the tree
may be a single 10^4-node chain, whose traversal would nest 10000 calls — past
CPython's default recursion limit and over the 512k stacks the judge hands
Java and Node. A frame holds the node, which child remains to visit, and a
slot for each finished child's sum; when both slots are filled the node's tilt
is taken, its total rolls into the parent's matching slot, and the frame is
dropped.

Every subtree sum stays within 10^4 nodes of 1000 each — 10^7, comfortable for
a 32-bit int — but the total they feed is not: a 10^4-node one-child chain of
1000s stacks tilts `0 + 1000 + 2000 + …` to 49,995,000,000, far past 32 bits.
The running total (and the answer) is therefore 64-bit, while the per-frame
sums need not be.

**Complexity:** `O(n)` time — each node enters and leaves the frame stack
exactly once — with `O(h)` space for that stack, where `h` is the tree height
(`O(n)` worst case, a chain).
