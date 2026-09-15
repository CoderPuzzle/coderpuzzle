# Solutions — Find All People With Secret

Both routes lean on the same fact: the meetings sharing one moment
settle together, so the whisper crosses a whole connected group of that
moment at once. The disjoint-set route merges the two attendees of every
meeting in a moment and then, before moving on, snips each attendee who
did not land beside person `0` back into a singleton, undoing the merge
so it cannot leak forward. The traversal route instead builds that
moment's little graph and floods it from the attendees who already knew,
which reads the spreading rule straight off the statement and never has
to take a merge back.

## Union-find with rollback per moment

Sort the meetings by time and keep one disjoint-set forest for the whole
run. Seed it by pointing person `0` at `firstPerson`, which puts the two
of them in a single component while everyone else still stands alone.
That is the invariant carried between moments: every holder of the
whisper sits in person `0`'s component, and every other person is a
singleton.

Take one equal-time block. Union the two attendees of each of its
meetings, which fuses the block's connected groups. A group holding
someone from person `0`'s component is now merged into it, while the
remaining trees are built out of attendees only — unions never touch a
person the block did not invite. So sweep the block a second time and,
for every attendee whose root is not person `0`'s root, reset that
person's parent to itself. The merge is rolled back and the singleton
invariant is restored, so a group that stayed in the dark cannot carry
the whisper into a later moment.

`find` climbs with path halving (`parent[x] = parent[parent[x]]`), which
flattens the trees as a side effect of searching them. Nothing else is
ever built: no adjacency list, no per-moment visited set, just the one
forest, and the answer is a final pass asking which people share person
`0`'s root. The sort is the dominant cost.

**Complexity:** `O(m log m + n · α(n))` time, `O(n)` space, where `m = meetings.length`.

## Process one timestamp graph at a time

Sort meetings by time. For every equal-time group, build a temporary undirected graph among its participants and start a breadth-first search from every participant who knew the secret before that time. Because sharing is instantaneous, the search reaches exactly the entire connected components that contain an informed person.

Promote every reached participant into the permanent informed set before moving to the next timestamp. Components without an informed seed are discarded, so their meetings cannot incorrectly carry knowledge into later times.

**Complexity:** `O(m log m + n)` time and `O(n + m)` space, where `m = meetings.length`.
