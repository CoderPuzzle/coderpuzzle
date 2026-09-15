# Solutions — Convert Doubly Linked List to Array II

Both solutions read every element with two walks and constant auxiliary
space, and both use the doubly linked shape twice: one walk positions
on an end of the list, and the other gathers the values. What separates
them is direction. One runs `next` past the handed node to the tail,
then reads back-to-front — a sweep whose buffer arrives reversed, and
which repairs the order with an in-place reverse. The other rewinds
through `prev` until the list runs out behind it, then reads
front-to-back, writing each value exactly once, already where it
belongs. Each twin pays for the distance to its own end: the overshoot
covers the stretch ahead of the handed node, the rewind the stretch
behind it, and the reading walks are the same length.

## Run Past the Tail, Then Read Backward

The handed node may sit anywhere, but `next` always ends somewhere:
walk it until it is empty, and the cursor is standing on the tail. No
values are gathered on this leg; it is repositioning only.

The read is then the same walk in reverse. Step back through `prev`
from the tail, appending every value until the walk falls off the head
— the buffer fills tail-to-head, so it holds the whole list, backwards.
The repair is the standard in-place reverse: swap the two ends inward
until the indices meet. Every value is written twice, once on the way
into the buffer and once by its swap, and nothing beyond the output
itself is allocated.

**Complexity:** `O(n)` time, `O(1)` extra space.

## Rewind to the Head, Then Sweep Forward

The mirror twin, and the cheaper read. The `prev` pointers are the way
back to the front: step to `node.prev` until it is empty, and the loop
exits standing on the head — however deep in the list the handed node
was, and with no values gathered on the way. From there the problem is
the plainest traversal there is: follow `next`, appending each value as
it is reached. The append order is the list order, so no repair pass
exists, each element is touched exactly once on the read, and a handed
node that already is the head skips the rewind entirely.

**Complexity:** `O(n)` time, `O(1)` extra space.
