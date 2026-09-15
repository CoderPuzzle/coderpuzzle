# Solutions — Minimum Time to Make Rope Colorful

## Single pass over maximal same-color runs

Only balloons whose neighbor shares their color ever need removing, so
split the rope into maximal runs of identical characters and handle
each run independently. Walk `colors` once, tracking the running sum
and running max of `neededTime` for the current run; whenever the next
balloon's color differs from the current run's color (or the string
ends), the run is finished and every balloon in it except the one with
the largest removal time must go, so its cost is `runSum - runMax`.
Reset the running sum and max to the new balloon's own time and
continue.

Summing `runSum - runMax` over every run gives the answer, because
keeping the single most expensive-to-remove balloon in each run is
always optimal: any other choice pays at least as much to remove the
rest, and a run's internal order never affects which balloon is
cheapest to keep — only its value does. A run of length one
contributes `0`, matching a color that already has no repeated
neighbor.

**Complexity:** `O(n)` time, `O(1)` space.
