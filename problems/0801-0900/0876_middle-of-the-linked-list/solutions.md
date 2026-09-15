# Solutions — Middle of the Linked List

## Fast and slow pointers

Finding the middle could be counted out with two passes — measure the length, walk half of it again — but a second trip is unnecessary: two pointers that leave the head together, the fast one taking two links for every one of the slow one's, split that bookkeeping between them. Whenever the fast pointer can no longer complete another two-node stride, it has run out of list, and the slow pointer is standing exactly on the middle.

The loop guard is what lands the walk on the second middle when the length is even. Every completed iteration moves `fast` forward two nodes and `slow` forward one, so `slow`'s distance from the head is always exactly half of `fast`'s — but the guard demands both of `fast`'s next two links before it lets `slow` move at all. An even-length list strands `fast` on its final node with only one link ahead, and by then `slow` has already advanced `n/2` times, onto the second of the two middles; an odd-length list drops `fast` off the end entirely, leaving `slow` on the one true middle. A single-node list never enters the loop and returns its own head.

Nothing is relinked: the walk is a read-only sweep that returns a pointer into the original chain — the suffix from the middle node onward — so each node is visited once and nothing is allocated. The Rust port keeps the same split of labor, but ownership forbids two live cursors in one Box chain: the fast walk runs first to measure how many front nodes the slow cursor must shed, and the suffix it leaves behind is handed over as the answer — same nodes, same single sweep.

**Complexity:** `O(n)` time, `O(1)` space.
