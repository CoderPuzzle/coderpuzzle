# Solutions — Meeting Rooms

## Sort by start, one pass

Whether two meetings clash is a local question, but the input hands them over
in arbitrary order. Sorting by start time lays the meetings along the timeline,
and once they are in that order any overlap must surface between next-door
meetings: a meeting can only clash with one that starts before it ends, and
after sorting those are exactly its neighbors. The sort does all the global
work; what remains is one comparison per adjacent pair.

The pass asks a single strict question of each neighboring pair: does the
earlier meeting end strictly after the later one starts? A shared boundary
point does not count — the statement is explicit that a meeting ending at time
`t` and one starting at `t` do not overlap — so equality passes. The first
strict violation settles the answer `false` on the spot, because two meetings
already occupying the same moment cannot be attended no matter what the rest of
the schedule looks like.

An empty array, or a single meeting, leaves the loop with no pair to check and
the answer is `true`. Equal starts need no special handling: each meeting ends
strictly after its own start, so two meetings sharing a start always fail the
strict test in one order or the other, and nested meetings fail it the same
way — the inner one starts before the outer one ends.

**Complexity:** `O(n log n)` time, `O(1)` space.
