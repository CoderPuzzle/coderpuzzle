# Solutions — Maximum Path Score in a Grid

## Budget-indexed dynamic programming

The only thing that makes this harder than a plain max-score path is the
budget: a cell worth `2` is never worse than a `1` at the same spot, but it
charges the same coin, so which prefix is "ahead" depends on how much of `k`
has already been spent. The fix is to carry the spending along in the state.
Let `dp[j][c]` be the best score collected on a path that ends at column `j`
of the row currently being swept and has paid total cost exactly `c`, with a
deeply negative marker for "no such path". Because walks only move right or
down, sweeping rows top to bottom and columns left to right means each state
is settled once its two feeds — the same column one row up and the same row
one column left — are done; a rolling pair of one-row tables keeps memory to
two slices.

Entering a cell either charges nothing (value `0`) or shifts every budget
state up by one (values `1` and `2`), then adds the cell's score. So each
cell takes the elementwise max of its up and left predecessors over the cost
axis, slides that axis one step when the cell charges — states pushed past
the budget cap fall off and are dropped — and adds the score. Cell `(0, 0)`
holds `0` by the constraints, so it seeds score `0` at cost `0`, and the
marker arithmetic stays safe because real scores are nonnegative while the
unreachable marker sits a billion below them. After the sweep, the answer is
the largest finite value anywhere on the final cell's cost axis, or `-1` if
the whole axis is unreachable.

Two bounds shrink the work. A path visits `m + n - 1` cells but starts free,
so it can charge at most `m + n - 2` times — cost indices beyond
`min(k, m + n - 2)` cannot occur and are not allocated. And scores top out at
`2 * (m + n - 1) < 800`, so 32-bit integers hold everything comfortably,
markers included.

**Complexity:** `O(m · n · k)` time, `O(n · k)` space.
