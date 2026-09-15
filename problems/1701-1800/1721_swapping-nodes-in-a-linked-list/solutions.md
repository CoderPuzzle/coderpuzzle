# Solutions — Swapping Nodes in a Linked List

The swap only exchanges the values carried by two nodes — the `k`th from the
front and the `k`th from the end — so no link anywhere changes. The single
solution below pins both nodes with one sweep: the tail lies exactly as far
beyond the `k`th node from the front as the kth-from-end node lies beyond the
head, so a cursor that has already advanced `k - 1` steps reaches the tail
precisely when a cursor started at the head reaches the second target.

## Meet in one sweep, swap two values

A first cursor walks `k - 1` steps from the head and stops on the `k`th node
from the beginning; the guarantee `k <= n` means it never steps past the
tail. A second cursor then starts at the head while a scout runs from the
first cursor onward: every move of the scout keeps the pair exactly `k - 1`
nodes apart, so when the scout lands on the tail the second cursor has `k -
1` nodes behind it — it stands on the `k`th node from the end. Both targets
are pinned before anything is written.

The exchange itself is one assignment of the two `.val` fields; every link,
including both ends of the list, is untouched, and the original head is
returned. The degenerate shapes need no special casing: when `n = 2k - 1` the
two cursors meet on the same middle node and the swap writes the same value
back, and when `k = 1` or `k = n` they pin the head and the tail of the list.

The walk is one forward sweep: the first cursor and its scout together
traverse the list exactly once, while the second cursor trails them over no
more than that same stretch, and the sweep holds nothing beyond the three
cursors.

**Complexity:** `O(n)` time, `O(1)` extra space.
