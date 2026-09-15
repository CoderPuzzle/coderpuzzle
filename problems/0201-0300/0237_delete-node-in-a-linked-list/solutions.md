# Solutions — Delete Node in a Linked List

## Copy the successor in, bypass the successor

Deleting a node the ordinary way means rewriting a predecessor's `next` — and a predecessor is the one thing the original interface never hands you. The escape is to stop treating deletion as unlinking. The named node absorbs its successor: the successor's value is copied into it, then its `next` skips over the successor to the node beyond. Everything before the named node keeps its values and order, everything after hangs exactly where it hung, one node fewer remains — the statement's whole definition of "deleted" — and no predecessor was ever needed.

On this bundle's wire the list arrives as values, so the function first walks from `head` to the node whose value equals `node`; values are unique, so this names exactly one node. The walk is pure locating — the deletion itself stays the head-less trick the problem is about: once the node is found, two writes finish the job, and the node guaranteed not to be the tail means the successor both writes rely on always exists.

Every node is read at most once on the walk and the deletion is two pointer writes, so nothing scales with the list beyond the locating pass.

**Complexity:** `O(n)` time, `O(1)` space.
