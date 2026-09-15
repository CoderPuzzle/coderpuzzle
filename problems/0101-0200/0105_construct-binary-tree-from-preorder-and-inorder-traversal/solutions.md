# Solutions — Construct Binary Tree from Preorder and Inorder Traversal

Both reconstructions are driven by the same reading of the two arrays:
preorder names a subtree's root before its descendants, and inorder places
that root between its two subtrees. The recursive split asks, per subtree,
"where does my root sit in inorder?" and needs a hash map to answer fast.
The iterative stack asks the converse question — "is the node I just built
due yet in inorder?" — and needs no map at all, because a single cursor
walking inorder detects the moment each left descent finishes.

## Divide and Conquer with an Inorder Index Map

The first unconsumed value of `preorder` is always the root of the subtree
being built. Locating that value inside `inorder` splits the work cleanly:
every inorder entry to the left of it belongs to the left subtree, every
entry to the right belongs to the right subtree, because inorder visits
left subtree, root, right subtree. Recursing on the two inorder ranges
reconstructs the entire tree.

Two details make this linear. A hash map from each value to its inorder
index turns the split lookup into `O(1)` instead of a linear scan. And
instead of slicing `preorder` apart, a single shared cursor consumes it
strictly left to right, one value per recursive call. That works because
preorder lists a subtree's root, then its whole left subtree, then its
whole right subtree — exactly the order in which the recursion asks for
root values. The recursion carries only `(low, high)` bounds on `inorder`
and picks the root from the cursor.

![Preorder's first value 3 is located in inorder at position 1, splitting [9] to the left and [15, 20, 7] to the right; the cursor then feeds 9 before 20, 15 and 7.](figures/solution-preorder-inorder-split.svg)

The base case `low >= high` marks an empty inorder range, which is how
missing children come out as `None` without any special casing. Values
are unique per the constraints, so each hash-map lookup identifies exactly
one split point.

**Complexity:** `O(n)` time, `O(n)` space — the index map holds `n`
entries and the recursion stack reaches tree height `h`, which is `O(n)`
in the worst case of a degenerate chain.

## Iterative Stack

This one consumes `preorder` in a plain loop, one value at a time, and
keeps the _spine_: the chain of already-built nodes whose left sides may
still be growing and whose right child is still pending. A cursor into
`inorder` marks the next entry awaiting its turn — and since inorder lists
left subtree, root, right, a spine top equal to `inorder[cursor]` means
exactly one thing: that node's entire left side is finished, because
everything in it has already come up in inorder.

So each new preorder value faces a two-way test. If the spine top is not
yet due, the value is the top's left child — descend, push, continue. If
the top is due, pop it (it will never receive another left descendant) and
keep popping while the exposed ancestor is due too, advancing the cursor
per pop; the new value becomes the right child of the deepest node popped,
which is precisely the node whose left side that run of pops just closed.
On the worked example, 1 becomes 5's left child; 9 arrives with 1 due, and
popping 1 exposes 5 — also due — so 9 becomes 5's right child; then 7
descends left off 9, and 12 arrives with 7 due, then 9 due, landing as 9's
right child.

Every value is pushed once, popped at most once, and the cursor only ever
advances — a linear sweep with no map at all, the inorder array itself
serving as the bookkeeping. The spine is the only extra storage, and it is
exactly the right-most path of the partially built tree, so `O(h)` entries
at any moment. (The Rust port, unable to keep mutable aliases along that
path, records the same decisions in a slot arena — children always taking
higher slots than parents — and assembles the owned boxes bottom-up from
it.)

**Complexity:** `O(n)` time, `O(h)` space beyond the output tree.
