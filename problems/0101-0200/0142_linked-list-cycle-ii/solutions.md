# Solutions — Linked List Cycle II

As in the detection variant, the wire-form input is materialized first in both ports: build the nodes from `values`, link them, and connect the tail back to index pos when pos is not -1; an empty input answers -1. Because the judge wants an index rather than a node reference, both detectors end by identifying the cycle's entry node and counting steps from the head to it.

## Floyd

Phase one is the standard tortoise-and-hare scan from the head; if fast falls off the end there is no cycle and the answer is -1.

When the pointers meet, write a for the distance from head to cycle entry, b for entry to meeting point, and c for the rest of the loop from meeting point back to entry. Slow has walked a + b while fast has walked twice as far; fast's surplus is whole laps, in the simplest form a + 2b + c = 2(a + b), which simplifies to c = a. So a pointer restarted at the head and slow restarted at the meeting point, each advancing one step at a time, converge after exactly a steps — right on the entry node.

![The list 3 -> 2 -> 0 -> -4 loops back to 2; the pointers meet at index 3 with a = 1, b = 2, c = 1, so a finder from the head and slow from the meeting point reach entry index 1 together.](figures/solution-floyd-entry-walk.svg)

The code then walks from the head counting steps until it reaches that node; the count is the 0-based index of the cycle's first node within `values`. All three phases are linear, and the only sizable storage is the O(n) node array built from the wire input — the detection itself uses two pointers, satisfying the follow-up's constant-memory bound.

**Complexity:** `O(n)` time, `O(n)` space — the reconstruction; the detection itself is `O(1)`.

## Hash set

Walk the list from the head dropping every node into a set keyed by identity (its address). Running off the end means no cycle and the answer is -1. The first node that is already in the set is the one the walk has visited before — and that first repeat is precisely the cycle's entry: the walk passes the entry once on its way into the loop and meets it again first on the way around, while every node before the entry can never be reached a second time.

With the entry node in hand, a short walk from the head counts the steps up to it — the index the judge expects. The set makes the argument transparent — no phase arithmetic, just "first node seen twice" — but costs O(n) memory, where the two-pointer version stays O(1).

**Complexity:** `O(n)` time, `O(n)` space.
