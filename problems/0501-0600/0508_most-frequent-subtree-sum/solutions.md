# Solutions — Most Frequent Subtree Sum

## Post-order sums into a frequency counter

The subtree sum of a node is that node's value plus the subtree sums of its two
children — the definition is itself recursive, so one post-order walk computes
every subtree's sum exactly once: by the time a node is judged, both of its
subtrees have already reported theirs. Each freshly settled sum goes into a
counter as a key, so when the walk ends the counter holds the frequency of
every distinct subtree sum in the tree.

The traversal carries its own stack of frames rather than recursing: the tree
may be a single 10^4-node chain, whose walk would nest 10000 calls — past
CPython's default recursion limit and over the 512k stacks the judge hands
Java and Node — so every runtime iterates instead. A frame keeps the node,
which child remains to visit, and the sum of the subtrees already finished
beneath it; the moment both children are done, the node's own sum is its value
plus that accumulator, and it rolls into the parent's.

The answer is the counter's tallest bucket — one value when a single sum is
strictly most frequent, several when ties share the top, which the constraints
by no means rule out (a chain of distinct values makes every sum a singleton).
The tied values come back sorted ascending: the judge compares arrays exactly,
and the sort is what pins the output to that order. Sum magnitudes stay tame —
at most 10^4 nodes of at most 10^5 each, so no sum exceeds 10^9 in absolute
value, comfortably inside a 32-bit integer.

**Complexity:** `O(n log n)` time — the walk itself is `O(n)`, and the final
sort orders the tie set, at most `n` values when every sum is distinct — with
`O(n)` space for the counter and the frame stack.
