# Solutions — Minimum Moves to Balance Circular Array II

## Parametric wrap cut with a convex line sweep

If the balances sum to a negative value, some person must end negative no
matter how units travel, so the answer is `-1`; otherwise a feasible plan
always exists. Model a plan as a net flow around the ring: edge `k` carries
`f_k` signed units from person `k` to person `k+1`, and a schedule with `m`
moves exists exactly when every person's final balance `balance[k] + f[k-1]

- f[k]`is non-negative, with cost`sum |f_k|`. Cut the wrap edge between
person `n-1`and person`0`and let`t`be its signed flow. Substituting`u_k = f_k - t`makes every constraint independent of`t`, leaving an inner
problem on a path — minimize `sum |u_k + t|`subject to`u_0 <= balance[0]`,
`u_k <= u_{k-1} + balance[k]`, and a terminal lower bound — whose value
`G(t)` is computed by a single left-to-right sweep that keeps the convex
  suffix-min envelope of the DP as a heap of breakpoints (slope trick).

The sweep maintains a constant plus breakpoints of the rising flank; each
step shifts breakpoints by `balance[k]`, then folds in the new `|u + t|`
term at valley `-t`: if the valley sits above the envelope's lowest point it
pays that difference into the constant, consuming the lowest breakpoint and,
only when the valley lies inside the capped support, replacing it by two
copies of itself. The total cost of a wrap flow `t` is `H(t) = |t| + G(t)`;
since `G` is a partial minimization of a jointly convex function over an
affine slice, `H` is convex in `t`, and because the constraint system is a
network matrix an optimal integer `t` exists. A binary search on the sign of
`H(mid+1) - H(mid)` over `[-U, U]` with `U = H(0)` therefore lands on the
minimum. All accumulators are 64-bit: costs reach distance times units,
about `500 * 10^8`, far beyond 32 bits.

**Complexity:** `O(n · log(n · max|balance|))` time — about `2 · log2(H(0))`
sweeps, each `O(n log n)` — and `O(n)` space.
