# Solutions — Delete the Middle Node of a Linked List

## Find the predecessor with two pointers

Start a slow pointer at a dummy node before the head and a fast pointer at the head. Advance the slow pointer by one node and the fast pointer by two nodes until the fast pointer reaches the end. The slow pointer then precedes index `⌊n / 2⌋`.

Bypass the slow pointer's next node. The dummy node also handles a one-node list, whose result is empty.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
