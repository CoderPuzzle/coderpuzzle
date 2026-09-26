# Solutions — Delete the Middle Node of a Linked List

## Find the predecessor with two pointers

Start a slow pointer at a dummy node before the head and a fast pointer at the head. Advance the slow pointer by one node and the fast pointer by two nodes until the fast pointer reaches the end. The slow pointer then precedes index `⌊n / 2⌋`.

![On head [1,3,4,7,1,2,6], three rounds of slow-steps-one, fast-steps-two park slow on the 4 right before middle 7, and the bypass link from 4 to 1 yields [1,3,4,1,2,6].](figures/solution-slow-fast-bypass.svg)

Bypass the slow pointer's next node. The dummy node also handles a one-node list, whose result is empty.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
