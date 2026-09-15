# Solutions — Minimum Costs Using the Train Line

## Two-Route Dynamic Programming

The only thing that matters about a stop is the cheapest you could have paid
to be standing there on each route. Keep two running values: `reg`, the
minimum cost to reach the previous stop while riding regular, and `exp`, the
same for express. Moving one segment forward, `reg[i] = min(reg[i-1],
exp[i-1]) + regular[i]` — dropping back from express is free, so either
previous state can feed a regular segment. Boarding the express line, by
contrast, costs `expressCost` every time it happens from the regular side,
so `exp[i] = min(reg[i-1] + expressCost, exp[i-1]) + express[i]`; staying on
express carries no extra fee.

`costs[i]` is then simply `min(reg[i], exp[i])` — a stop counts as reached
from either route. Each stop is settled with four additions and comparisons
from its predecessor alone, so a single left-to-right pass fills the whole
answer; nothing else about the route structure matters because any strategy
decomposes into exactly these per-segment stay-or-board decisions.

**Complexity:** `O(n)` time, `O(n)` space.
