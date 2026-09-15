# Solutions — Insert into a Sorted Circular Linked List

## One walk to the insertion gap

A sorted circular list is a rotation of a non-descending sequence, so a new
value belongs either inside an ascending run — between a `previous` that is
`<= insertVal` and a `current` that is `>= insertVal` — or at the list's one
descent, where the maximum wraps back to the minimum and any value at or
beyond an extreme fits. The solution walks the ring once from the given node,
holding each adjacent pair, and stops at the first gap satisfying either
condition; splicing the new node in there keeps every rotation of the ring
sorted. An empty input short-circuits to a single self-pointing node.

If the whole walk returns to the head without finding a gap, the ring is one
constant run of equal values — every gap is equally valid — and the loop's
natural exit leaves `previous` at the tail, so the same two pointer
assignments insert there. That is also why no special case is needed for
values beyond the extremes: the descent gap test (`insertVal >= previous` or
`insertVal <= current` across the wrap) catches them on the way around.

The walk never revisits a node, the head is never moved (the problem requires
returning the originally given node, and only the empty case returns a fresh
one), and the splice is two pointer writes. Values and the insert value are
32-bit throughout, and the loop is iterative — a ring may hold tens of
thousands of nodes, so the traversal is a flat loop, never recursion.

**Complexity:** `O(n)` time for at most one lap around the ring and `O(1)`
extra space — one new node and two cursor references.
