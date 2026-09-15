# Solutions — Reverse Nodes in k-Group

## Iterative group reversal

A dummy node placed before the head removes the only awkward case, the first group: from then on every group is entered the same way, through the node that precedes it. From that anchor the method first probes `k` nodes forward. If the probe falls off the end, the group is incomplete, the leftover tail is already hanging in its original order behind the anchor, and the dummy's successor is returned as the finished head.

When the probe does land on a group's k-th node, the group is reversed in place. `prev` starts at the node after the k-th, so each flipped link points backwards down the group and the last flip naturally splices the group onto whatever follows it. Walking `curr` from the group's first node and rotating the pair `curr.next, prev, curr` for exactly the nodes of the group leaves `prev` on the k-th node, the group's new head, which is attached to the anchor in its place.

The old first node, now reached through the anchor before the reattachment, has become the group's last node and the anchor for the next group, so the loop simply repeats from there. Only pointers are ever rewritten — no `val` changes — and the whole reversal runs through two references besides the probe, which is the `O(1)` extra space the follow-up asks for.

**Complexity:** `O(n)` time, `O(1)` extra space.
