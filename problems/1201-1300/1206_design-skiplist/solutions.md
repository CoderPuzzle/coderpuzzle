# Solutions — Design Skiplist

## Layered sorted lists with random promotion

A skiplist stacks several sorted singly-linked layers, each a "skip" version of the one below it: every value appears in the bottom layer, and each higher layer keeps roughly half the nodes of the layer below. `add` inserts a value as a fresh node promoted to a random level (a geometric coin with p = 1/2, capped at 16) and splices it into every layer it occupies — duplicates are simply separate nodes, so the multiset behavior falls out for free. `search` and `erase` start at the top layer and, at every layer, step right while the next node's value is still below the target, then drop a level. `search` reads the first node at the bottom layer; `erase` unlinks the matched node from exactly the layers where it is the immediate successor, returning false when no node with that value exists.

The random promotion is what buys the speed: because each layer skips about half of the remaining list, a value is reachable from the top in about `log n` steps, so every operation runs in expected logarithmic time. The level cap bounds the per-node storage while still covering the value range and call count the constraints allow.

**Complexity:** O(log n) expected time per `search`, `add`, and `erase`, and O(n) space.
