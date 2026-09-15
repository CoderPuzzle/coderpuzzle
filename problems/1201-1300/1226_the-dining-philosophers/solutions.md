# Solutions — The Dining Philosophers

## Asymmetric fork ordering

Deadlock in the naive solution comes from symmetry: every philosopher reaches
for their left fork first, so all five permits can be taken while all five
philosophers block on their right — a perfect wait-cycle. One semaphore per
fork with an asymmetric pickup rule breaks the symmetry: even philosophers
acquire left-then-right, odd philosophers right-then-left. The wait-for graph
then has no cycle (no philosopher waits on a fork while holding the fork a
neighbour needs to finish), so some philosopher can always eat, and the table
never stalls.

Once both forks are held, the call is straight-line — pick, pick, eat, put,
put — and the forks are released in reverse acquisition order. Two
non-adjacent philosophers can still eat simultaneously (the table's forks
allow it), so the solution keeps the concurrency a single global lock would
give up, while each `wantsToEat` call is independent: repeated calls for the
same philosopher simply queue on the same semaphores.

**Complexity:** `O(1)` synchronization per meal — two acquires and two
releases — with five one-permit semaphores of `O(1)` space.
