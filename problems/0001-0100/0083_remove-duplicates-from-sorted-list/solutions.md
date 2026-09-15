# Solutions — Remove Duplicates from Sorted List

## Single walk, unlinking equal successors

A sorted list lines every duplicate up directly behind its original — all copies of a value form one contiguous run — so no node ever needs to know anything about the rest of the list, only about its immediate successor. A `current` cursor walks from the head, and whenever `current.next` holds the same value as `current` itself, that successor is a copy of a node already kept: one redirection, `current.next = current.next.next`, unlinks it from the chain.

The unlink deliberately leaves the cursor in place, because the node behind the deleted copy may be yet another copy of the same value — staying put collapses a run of any length behind a single kept node, and only when the successor's value differs does the cursor step forward. The head node is always kept, being the first occurrence of its value, so the method returns `head` untouched; an empty list or a single node never enters the loop at all.

Every node is read once and every duplicate costs one pointer write, so the whole sweep is a single pass with no auxiliary structure. The Rust port keeps its mutable cursor on the kept node itself — ownership forbids holding a node and its successor live at once — so it peeks at `node.next` by shared reference and splices each duplicate out with `take()`; same unlink, same single pass.

**Complexity:** `O(n)` time, `O(1)` space.
