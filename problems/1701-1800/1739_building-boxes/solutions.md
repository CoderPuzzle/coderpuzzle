# Solutions — Building Boxes

The floor count is smallest when the pile is as dense as the rules allow,
and density concentrates in a corner, where two walls already pin the
sides of the innermost boxes. So flip the question around: with `m` boxes
on the floor, arranged as densely as the rules permit, how many boxes can
the storeroom hold in total? That capacity grows strictly with `m`, and
the answer is the least `m` whose capacity reaches `n`.

## Corner pyramid with a runoff diagonal

Lay the floor as a staircase hugging the corner — every cell `(x, y)`
with `x + y <= k + 1`, a footprint of `T_k = k(k+1)/2` cells. The maximal
legal pile on it is the corner pyramid: the column at `(x, y)` rises to
height `k + 2 - x - y`. A box at height `z >= 2` rests on the box below
it, whose four vertical sides face the four neighboring cells one level
down; in the pyramid the layer at each height is itself a smaller
staircase (the cells with `x + y <= k + 2 - z`), so every one of those
neighbors is a box of that layer or a wall — and no column rises higher,
because the outermost columns always have open floor on their far side.
Summing layer sizes `T_k + T_{k-1} + ... + T_1` gives
`S_k = k(k+1)(k+2)/6` boxes. This footprint is also the best use of `m`
cells: every side condition is a demand for a neighboring box or a wall,
walls exist only at the corner, and an exchange argument sliding floor
cells toward the corner shows no `m`-cell footprint ever holds more than
the staircase.

Between complete pyramids, `m = T_k + j` with `1 <= j <= k + 1`: keep the
k-staircase and lay the `j` extra cells along the next diagonal, starting
at the wall. The extras carry a mini-staircase of their own — the p-th
extra cell adds `p` boxes, its own floor box plus the `p - 1` boxes that
become legal in the small pile rising behind it — so `j` extras add
`T'_j = j(j+1)/2`. When `j` reaches `k + 1` the runoff closes into the
next full staircase and `S_k + T'_{k+1} = S_{k+1}`, so
`capacity(m) = S_k + T'_j` is strictly increasing and welds seamlessly
across pyramid boundaries.

Since capacity strictly increases with `m`, the answer is the least `m`
with `capacity(m) >= n`: binary-search the largest `k` with `S_k < n` —
the biggest complete pyramid below the target — then the least `j` with
`T'_j >= n - S_k`, the runoff covering what remains; the answer is
`T_k + j`. At the bound `n = 10⁹` that is `k = 1816`
(`S_1816 = 999800616`, `S_1817` just past `10⁹`) and the count `1650467`.
The products leave 32-bit range (`S_k` is evaluated up to the search
ceiling `k = 2500`, where it is about `2.6 × 10⁹`), so the fixed-width
implementations carry them in 64-bit integers; the returned count itself
stays far below `2³¹`.

**Complexity:** `O(log n)` time, `O(1)` space.
