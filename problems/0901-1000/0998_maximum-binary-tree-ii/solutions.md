# Solutions — Maximum Binary Tree II

## Walk the right spine

Appending val to the end of the original array can only disturb the
tree's right spine: every node off that spine is the max of a subarray
that lies entirely before the appended value, so it and its whole
subtree are untouched by the append. If val beats everything on the
spine — including the empty-tree case — it becomes the new overall
maximum and takes the whole old tree as its left child.

Otherwise walk down the spine while it still dominates val: the walk
stops at the first spine node whose right child is either absent or
already smaller than val, exactly where val belongs. Val takes over
that child slot, and whatever used to sit there — necessarily smaller
than val, since it lost to val's dominance the moment the walk reached
it — becomes val's own left subtree. No node off the spine is ever
visited or rebuilt.

**Complexity:** `O(h)` time, where `h` is the height of the tree — the
walk descends at most one right-spine node per step — and `O(1)` extra
space beyond the single inserted node.
