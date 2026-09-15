# Solutions — Swap Nodes in Pairs

## Iterative rewiring with a dummy head

The list is restructured by walking it one pair at a time and crossing pointers, never touching a `val`. A dummy node placed before the head removes the only awkward case — swapping the first pair changes which node the list starts at, and with the dummy every pair is reached through the node before it, first pair included. `prev` holds that node; the loop runs while two more nodes exist ahead of it, so an odd list's leftover tail is simply left in place.

Each iteration unhooks exactly one pair. The two nodes are named `first` and `second`, and three pointer writes perform the swap: `first.next` adopts whatever followed the pair, `second.next` turns back onto `first`, and `prev.next` adopts `second` — the pair is now crossed, with `second` leading. The write order matters only in that `first.next` must be redirected before `second.next` claims it. Afterwards `prev` advances to `first`, the tail of the freshly swapped pair, which is precisely the node before the next pair.

When the loop ends, `prev` stands on the last node (or the dummy, for a list shorter than two) and `dummy.next` is the new head. Empty and single-node lists never enter the loop and come back unchanged. The Rust port takes the pair fully out of the chain with `take()` before re-linking it, which is what ownership demands: two nodes cannot be re-crossed while the list still holds a path into them.

**Complexity:** `O(n)` time, `O(1)` space.
