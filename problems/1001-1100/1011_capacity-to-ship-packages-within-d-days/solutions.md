# Solutions — Capacity To Ship Packages Within D Days

## Binary search on the ship capacity

Feasibility is monotone in the capacity: if the packages fit in `days` days with capacity `cap`, they fit with any larger capacity. That makes the answer — the least feasible capacity — a search target. The bounds are natural: `lo = max(weights)`, since the ship must at least carry the heaviest single package, and `hi = sum(weights)`, which ships everything in one day and is always feasible because `days >= 1`.

The feasibility check is a single greedy left-to-right pass that loads packages in the given order (order is fixed, so greedily filling each day as much as possible is optimal for minimizing day count): `current` accumulates until the next package would overflow, at which point a new day opens with `current = w`. The check bails out early the moment `need` exceeds `days`. The binary search itself keeps `hi` feasible and drives `lo` up past every infeasible midpoint, converging on the smallest feasible capacity.

The extremes need no special handling: `days == len(weights)` makes the answer `max(weights)` (each package alone) and `days == 1` makes it `sum(weights)`, both of which the search finds on its own.

**Complexity:** `O(n log S)` time, where `S = sum(weights) - max(weights)` is the search range; `O(1)` space.
