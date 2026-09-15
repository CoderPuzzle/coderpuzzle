# Solutions — Reaching Points

## Backwards Euclidean reduction

Working forward from `(sx, sy)` branches exponentially, so work backwards from `(tx, ty)`. The last forward operation replaced either `(x, y)` with `(x + y, y)` or `(x, x + y)`, so backwards, the larger of the two coordinates must have the smaller subtracted from it. While both coordinates stay at or above the start (`tx >= sx` and `ty >= sy`), reduce with `tx %= ty` when `tx > ty` and `ty %= tx` otherwise — the modulo subtracts the smaller coordinate many times at once, exactly like the Euclidean algorithm, because until the coordinates cross, the same subtractions repeat.

Modulo can overshoot below `sx`, which is correct to allow: if `tx` drops under `sx`, the loop condition fails and the answer is false, since forward moves only grow coordinates. The loop must first check the exact terminal cases, because plain modulo cannot land on an arbitrary target: once `tx == sx`, further backwards steps only subtract `sx` from `ty`, so the start is reachable exactly when `(ty - sy) % sx == 0`; symmetrically for `ty == sy` with `(tx - sx) % sy == 0`. If both coordinates match simultaneously, return true.

The guard `tx >= sx and ty >= sy` also terminates the loop when either coordinate shrinks past its start value, covering impossible targets like `(1, 1) -> (2, 2)`, where reduction reaches `(0, 2)` and exits false. Each iteration at least halves the larger coordinate, giving Euclid-like logarithmic behavior on values up to `10^9`.

**Complexity:** `O(log(max(tx, ty)))` time, `O(1)` space.
