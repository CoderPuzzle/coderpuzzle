# Solutions — Random Flip Matrix

## Swap-map drain over virtual indices

Keep a counter `remaining` of unflipped cells and a hash map that re-points virtual indices to displaced cell ids. `flip` draws one uniform index in `[0, remaining)`, resolves it through the map (absent means the index still names itself), and then moves the last virtual slot's cell into the drawn slot before decrementing — the Fisher–Yates transposition, run lazily. Every unflipped cell sits in exactly one live slot, so each draw is uniform over exactly the zero cells, and each call costs one random draw, one map probe, and one map write regardless of grid shape.

`reset` restores the counter and clears the map — the grid is never materialized, so reset touches only the entries flips actually created. Space is therefore proportional to the number of flips since the last reset (never more than the smaller of `m·n` and the call budget), not to `m·n` itself, which matters at the constraint ceiling of `10⁴ × 10⁴`.

The judged contract drains the stream: after a reset, repeating `flip` exactly `m·n` times must return every cell exactly once, which this construction guarantees structurally — each decrement retires one distinct cell id and no id can re-enter the live range before a reset.

**Complexity:** `flip` in O(1) expected time with exactly one random call, `reset` in O(1); O(k) space for `k` flips since the last reset.
