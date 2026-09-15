# Solutions — Array Transformation

## Simulate whole days until a day changes nothing

Each day is computed from a snapshot of the previous day: every interior
element compares itself against its neighbors in the _old_ array and moves
one step toward them — up out of a strict valley, down off a strict peak —
while the endpoints and every element that is not a strict local extremum
stay put. Computing the whole day from the old array, rather than updating in
place, is what makes the rule well-defined: neighbors must be yesterday's
values.

The loop repeats until a day produces the identical array, which is the fixed
point the statement promises. Termination is guaranteed — a strict peak
decreases and a strict valley increases, and each move strictly reduces the
sum of absolute differences between neighbors, a non-negative quantity — so
the process can only run finitely many days.

**Complexity:** `O(d * n)` time for `d` days (empirically a few dozen at
these bounds) and `O(n)` space for the next-day snapshot.
