# Solutions — Maximum Containers on a Ship

Every container weighs exactly `w`, so a load is described by a single number:
how many containers sit on the deck. That number faces two ceilings that never
interact — one from the deck's geometry, one from the ship's budget — and the
answer is simply the tighter of the two.

## Two ceilings, take the tighter

The deck is `n x n`, so at most `n * n` containers can ever be placed — one
per cell. The weight budget independently admits at most `maxWeight / w`
containers, rounded down because a partial container is not a container. Any
count up to the smaller of the two ceilings is realizable: placing containers
one at a time spends exactly one cell and exactly `w` units of budget each,
so the binding constraint is whichever ceiling is reached first, and no load
can slip past either.

The computation is a single `min`. Values stay modest throughout — `n * n` is
at most `10⁶`, the quotient at most `10⁹` — so 32-bit integers carry every
intermediate comfortably, and the floor division inherent to integer division
in the fixed-width languages (explicit `Math.floor` in JavaScript and
TypeScript, whose `/` is real division) matches the partial-container
rounding the budget demands.

**Complexity:** `O(1)` time, `O(1)` space.
