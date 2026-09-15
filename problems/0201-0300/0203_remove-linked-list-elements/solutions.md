# Solutions — Remove Linked List Elements

## Dummy head, skipping every match

Unlike deleting from a sorted list, here the head itself may be a node to remove — and so may every node behind it — so a cursor anchored at `head` has nothing stable to stand on while the first matches fall away. A dummy head planted in front of the list fixes that: `dummy.next` always addresses the first survivor, whoever it turns out to be, and deleting the original head degenerates into the same operation as deleting any other node — unlinking the successor of some node.

The walk keeps `current` on a kept node and only ever inspects `current.next`. When the successor's value equals `val`, one pointer write skips it and the cursor deliberately stays put, because the node behind a match may match too; only a differing value steps the cursor forward. When the walk runs off the end, `dummy.next` is the new head — empty when nothing survived. The recursion the topic tags tempt you toward does the same work on the call stack, spending `O(n)` stack frames; the loop gets identical results in constant space.

Every node is read once and every removal costs one pointer write, so the sweep is a single pass with no auxiliary structure — the memory footprint does not depend on how much of the list dies.

**Complexity:** `O(n)` time, `O(1)` space.
