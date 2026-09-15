# Solutions — Distribute Candies to People

## Simulate the gifts one turn at a time

The whole process is a single loop. Each turn hands out the current gift —
which grows by one every turn — to the person at the current position of the
row, then advances to the next person and wraps around when the end of the
row is reached. The only wrinkle is the final turn, where the remaining
candies may be fewer than the next gift: handing over `min(give, candies)`
makes the last person receive all that is left, exactly as the statement
describes.

Because each turn gives one more candy than the last, the cumulative total
after k turns is the triangular number `1 + 2 + ... + k`, so the loop
reaches roughly `sqrt(2 * candies)` turns before the supply runs out; every
turn is constant work on top of that.

**Complexity:** `O(sqrt(candies) + num_people)` time, `O(num_people)` space.
