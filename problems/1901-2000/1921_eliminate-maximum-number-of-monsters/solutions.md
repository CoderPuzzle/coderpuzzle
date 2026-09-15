# Solutions — Eliminate Maximum Number of Monsters

Every monster is fully described by one number: the minute it arrives,
`ceil(dist[i] / speed[i])`. The weapon fires at minutes 0, 1, 2, …, and the
statement's exact-moment rule means the i-th shot requires the targeted
monster's arrival to be strictly greater than `i` — a monster stepping into
the city as the weapon charges ends the game first. So the whole game
reduces to scheduling shots against arrival minutes.

## Greedy by arrival minute

If any set of k shots is feasible, then taking the k earliest arrivals in
that order is feasible too — replacing a shot with an earlier-arriving
monster never violates a "arrival > position" constraint. Hence sorting the
arrival minutes and shooting in that order is optimal, and the answer is the
length of the longest prefix whose i-th smallest arrival still exceeds `i`.

The code computes `(dist[i] + speed[i] - 1) / speed[i]` — integer arithmetic
for the ceiling, immune to any float rounding — sorts, and returns at the
first index where `arrivals[i] <= i`; if the scan completes, every monster
died and `n` is returned. Example 2 makes the loss rule concrete: arrivals
`[1,1,2,3]` fail at index 1, so exactly one monster dies.

**Complexity:** `O(n log n)` time for the sort, `O(n)` space.
