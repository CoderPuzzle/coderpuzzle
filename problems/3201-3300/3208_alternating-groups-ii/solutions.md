# Solutions — Alternating Groups II

Whether a size-k stretch alternates is decided entirely by its `k - 1`
neighbor pairs: all of them must join differently-colored tiles. That turns
group counting into run bookkeeping around the circle, with the usual care
that windows wrap past both ends.

## Anchor-restricted sliding run

Sweep virtual positions `0 .. n + k - 2`, where virtual index `p` reads tile
`p % n`; because indexing wraps, a neighbor pair that crosses the seam is
still compared as tiles `n - 1` and `0`. Track the length of the alternating
run ending at each virtual position — reset to 1 whenever the current tile
equals its predecessor, otherwise extend — so any position whose run reaches
`k` sits at the end of an alternating window. Credit exactly the windows
whose anchor `p - (k - 1)` is a real start (`0 .. n - 1`): anchoring to one
lap means every group is counted at its unique starting tile, and full
`k = n` windows fall out naturally since their anchor still lands in range.

The count never exceeds `n <= 10⁵`, so 32-bit returns suffice throughout.

**Complexity:** `O(n)` time, `O(1)` space.
