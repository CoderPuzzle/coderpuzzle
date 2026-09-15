# Solutions — Rotate List

## Close the ring

Rotating right by `k` only ever moves the final `k % n` nodes to the front — every full lap returns the list to itself — so the first thing to establish is the length `n`, and the walk that counts it ends on the tail for free. Linking that tail back onto the head closes the list into a ring, which turns the rotation itself into pure pointer arithmetic: the new head is `n - k % n` steps around the ring from the old one, and the node just before it becomes the new tail.

The code guards the empty list — nothing to rotate, and the modulo would divide by zero — then walks `n - k - 1` steps from the head to the new tail. Two writes finish the job: the node after the new tail is remembered as the head to return, and nulling the new tail's link cuts the ring back into a straight list. `k == 0` needs no special case: the walk lands on the old tail, and cutting its link to the head simply restores the original list.

Because `k` is reduced modulo the length before any pointer moves, a `k` of two billion costs exactly as much as its remainder. The Rust port cannot form a cycle in a `Box` chain, so it performs the same rotation as a splice: the suffix is unhooked with `take()` and the old front is attached after it — same nodes, same single cut.

**Complexity:** `O(n)` time, `O(1)` space.
