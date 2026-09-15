# Solutions — Linked List Cycle

Both variants reconstruct the wire-form input the same way: the judge hands
the list over as `values` plus the tail's back-edge index `pos`, so the
first step materializes it — create one node per value, link them in order,
and, when pos is not -1, point the tail back to the node at index pos. An
empty `values` array is acyclic by convention and returns False
immediately. That reconstruction necessarily holds every node, which is
O(n) storage forced by the input format; the two detectors differ only in
what they add on top of it.

## Floyd

Floyd's tortoise and hare. Both pointers start at the head; slow advances one node per step and fast two. If fast ever runs past the end of the list — itself null or its successor null — the list terminates and there is no cycle. Otherwise both pointers are trapped inside the loop, and because fast gains one node per step on slow around the cycle, it must catch slow within a single lap; their meeting is the proof of a cycle.

The detection itself keeps only two pointers — the O(1) memory the follow-up asks for, where a visited-node set would cost O(n). The whole function is linear: the build pass plus at most about 2n pointer advances before fast exits or the meeting happens.

**Complexity:** `O(n)` time, `O(n)` space — the reconstruction; the detection itself is `O(1)`.

## Hash set

Walk the list once from the head, dropping every node into a set keyed by identity (its address). If the walk ever runs off the end — a null successor — the list terminates: no cycle. If instead the next node is already in the set, the walk has come around to a node it passed before, and following it again would loop forever; the first such repeat is the proof.

Simpler to reason about than the two-pointer dance — no phase arithmetic, just "have I been here?" — but it pays O(n) memory for the set, exactly the bound the follow-up asks to avoid.

**Complexity:** `O(n)` time, `O(n)` space.
