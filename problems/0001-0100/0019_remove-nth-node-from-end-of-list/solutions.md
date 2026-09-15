# Solutions — Remove Nth Node From End of List

Both approaches unlink around the same predecessor — the node `sz - n`
steps past a dummy head — and differ only in how they find it. The
count-then-cut reading is the direct one: a first sweep measures the
list, arithmetic turns `n` from the tail into `sz - n + 1` from the
head, and a second sweep walks straight to the predecessor. The
two-pointer gap walk trades the measuring sweep for a head start:
`fast` runs `n` nodes ahead and both advance in lockstep, so `slow`
arrives at the same predecessor without the length ever being counted —
the single sweep the follow-up asks for, which is why it closes the
file as the reference.

## Count, Then Cut

A singly linked list only walks forward, so the direct reading of "nth
from the tail" has to convert it into a position from the head — and
that conversion needs the one thing the list will not hand over: its
length. The first pass spends a sweep on exactly that, marching a
single cursor node by node to count `sz`. Arithmetic does the rest:
the node to drop is the `(sz - n + 1)`-th from the head, so its
predecessor sits `sz - n` steps past the dummy. When `n = sz` that
count is zero, the dummy itself is the predecessor, and the true head
is unlinked like any other node.

The second pass is then mechanical: walk `sz - n` steps from the dummy
and relink around the node reached, `pred.next = pred.next.next`. This
is the honest cost of the straightforward reading — every node is
visited once by the counting sweep and most of them again by the
cutting sweep — still linear time and constant space, but two passes
over the list where the gap walk below manages one.

**Complexity:** `O(sz)` time, `O(1)` space.

## Two pointers with a dummy head

The node to unlink is the nth from the end, and a singly linked list can only be walked forward — so the natural idea of counting the length first and re-walking to the `len - n`-th node costs two passes. The two-pointer trick removes the second counting pass: launch a `fast` pointer `n` nodes ahead of a `slow` one, then advance both in lockstep until `fast` falls off the end. At that moment `slow` has walked exactly `len - n` nodes, which lands it on the predecessor of the node being removed — the only place an unlink is possible.

A dummy node placed in front of the head makes removing the true head the same predecessor-unlink as removing any other node, so no special case exists anywhere in the loop; returning `dummy.next` also hands back an empty list for free when every node is removed. After the lockstep walk, one statement — `slow.next = slow.next.next` — drops the target node, and the answer is the list that remains.

Each pointer moves at most `sz` nodes in total, and the two walks together visit each node a constant number of times, which answers the follow-up: the removal happens in a single sweep with no length computed up front.

**Complexity:** `O(sz)` time, `O(1)` space.
