# Solutions — Minimum Sum of Values by Dividing Array

## Segment-AND Dynamic Programming

Dynamic programming over the target list gives the backbone: after round
`j`, `g[k]` holds the cheapest way to split the first `k` elements into
exactly `j` segments matching `andValues[:j]`. A segment ending at `r` with
start `l` costs `g_prev[l] + nums[r]`, so every right end needs a minimum of
the previous layer over exactly those starts whose window AND equals the
current target.

The AND-group structure supplies each query range for free. Scanning left,
`AND(nums[l..r])` only sheds bits, so equal values occupy contiguous start
runs; keeping one entry per distinct value (its smallest start) — with a new
element folding every stored value via `&` and merging repeats — maintains
at most one entry per set bit of `nums[r]`'s binary length. The entries run
in strictly decreasing numeric order, so the runs matching a given value are
found directly: the target's entry anchors the left end, its neighbor's start
bounds the right. Because these ranges also shift predictably as `r`
advances, any RMQ works; an iterative segment tree rebuilt once per layer
answers them in `O(log n)` with plain loops and no recursion anywhere.

Everything stays in small integers: at most ten segments carry values below
`10⁵`, so sums stay under `10⁶`, an order of magnitude below both `2³¹` and
`2⁵³`. Unreachable states are kept in an inert sentinel that never takes part
in arithmetic, and `-1` is reported when the final layer's `g[n]` remains
untouched.

**Complexity:** `O(n · m · log n + n · G)` time (`G <= ~17` group entries per
right end), `O(n)` space.
