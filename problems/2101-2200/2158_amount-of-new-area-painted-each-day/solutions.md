# Solutions — Amount of New Area Painted Each Day

Each day asks for the length of the part of `[start_i, end_i)` that no earlier
day covered, and coordinates live on a bounded number line, so the whole task
is bookkeeping over a 5 × 10⁴-cell canvas that only ever grows.

## Jump-pointer canvas over the coordinate range

Keep an array `nxt` with one slot per cell where `nxt[c]` names a cell at or
after `c` that might still be unpainted — initially `c` itself. A `find`
routine walks the pointers to the first truly unpainted cell and compresses
the path behind it, exactly like union-find. Painting a unit cell then just
points it one past itself, so a day's walk from `find(start)` to `end` visits
precisely the still-blank cells and counts them into `worklog[i]`.

Every unit of the painting is stepped on exactly once across all `n` days:
once painted, a cell is only ever crossed again through a compressed pointer,
never rescanned. Revisits of fully painted stretches cost one compressed
`find` each, which is amortized constant. That gives `O(n + U · α(U))` overall
for `U = 5 × 10⁴` cells — effectively linear — against `O(n · U)` for
rescanning the canvas every day.

All areas fit a 32-bit integer (`end_i` is at most 5 × 10⁴ and so is any
single day's contribution), and the walk is a flat loop with no recursion, so
no language needs a wider type or a larger stack.

**Complexity:** `O(n + U · α(U))` time, `O(U)` space.
