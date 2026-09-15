# Solutions — Airplane Seat Assignment Probability

## Track the one undecided seat

Trace what the random choices actually decide. When a passenger finds their
seat taken, their random pick either takes seat 1 (everyone after sits in
their own seat, including the last), takes seat n (the last passenger
certainly loses), or takes the seat of some still-boarding passenger k — and
passenger k then faces exactly the same situation, one "floating" claim
chasing a shrinking set of seats.

At every such decision the three outcomes — seat 1, seat n, or pass the
problem on — are equally likely among the remaining seats, and seat 1 and
seat n are always both available until one of them is taken. The process
therefore ends with seat 1 or seat n chosen with equal probability, and the
last passenger gets their own seat exactly when seat 1 goes first:
probability `1/2` for every `n >= 2`. The base case `n = 1` is certain: the
only passenger takes the only seat.

**Complexity:** `O(1)` time and space.
