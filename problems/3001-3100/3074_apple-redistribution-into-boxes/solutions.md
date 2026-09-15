# Solutions — Apple Redistribution into Boxes

## Sort capacities, fill from the largest

Because apples from one pack may be split across several boxes, the division
into packs carries no information: a set of boxes can hold the harvest
exactly when its combined capacity is at least `sum(apple)`. The problem
therefore reduces to choosing the fewest boxes whose capacities sum to that
total.

Any group of `k` boxes covers at most what the `k` largest boxes cover, so an
exchange argument shows the optimum is always a prefix of the capacities
sorted in descending order. The code sorts `capacity` that way and accumulates
rooms until the running total reaches the apple count; the number of boxes
accumulated at that moment is the answer, and the input guarantees the moment
arrives.

**Complexity:** `O(m log m)` time, `O(1)` auxiliary space (the sort reorders
`capacity` in place).
