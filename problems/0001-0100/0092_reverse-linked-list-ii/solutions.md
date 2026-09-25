# Solutions — Reverse Linked List II

## In-place segment reversal

A dummy node placed before the head removes the only awkward case, a segment that starts at the head: whatever precedes the segment is then always an ordinary node, never a missing one. From that anchor the method walks `left - 1` links to sit on the node just before the segment, so the positions are counted exactly once and never revisited.

The segment is then reversed in place. Starting with `prev` on the anchor and `curr` on the segment's first node, each step rotates the pair `curr.next, prev, curr` forward, so every flipped link points backwards down the segment while `curr` keeps the unconsumed remainder. After exactly `right - left + 1` flips, `prev` sits on the segment's new head and `curr` on the node after the segment.

![On head = [1,2,3,4,5] with left = 2 and right = 4, three flips from prev on node 1 point 2-3-4 backwards in place, and the two splice writes 1→4 and 2→5 finish the one-pass result [1,4,3,2,5].](figures/solution-inplace-segment-reversal.svg)

The anchor's successor is still the segment's old first node, now its last node, so it takes `curr` as its successor and `prev` takes its place. Returning the dummy's successor finishes the job. Only two references beyond the anchor are ever rewritten, which is the single pass the follow-up asks for.

**Complexity:** `O(n)` time, `O(1)` extra space.
