# Solutions — Sum Of Special Evenly-Spaced Elements In Array

A query never rearranges the array — it walks one residue class from `x`
onward — so the whole problem is pricing that walk. One stride at
`O(n/y)` is nothing; a hundred and fifty thousand of them at `y = 1` is
everything. The fix is to stop walking the strides that are long and
start remembering them instead.

## Split the strides on sqrt(n)

Every answer lives on the arithmetic progression `x, x+y, x+2y, …`, so
the natural evaluation — accumulate the stride directly — costs `O(n/y)`
per query. That is exactly fine when `y` is large: put a threshold `B`
on `y` and every query with `y > B` strides at most `n/B < B` indices,
so it is answered by one short pass. Small `y` is where strides get
long — and small `y` is also where strides repeat, since all queries
sharing a `y ≤ B` draw from only `y` residue classes. A table `pre[y]`
filled right-to-left with `pre[y][i] = (nums[i] + pre[y][i+y])` carries
each small `y`'s answers ready-made, and any such query becomes a
single lookup.

The threshold balances the two regimes at `B ~ sqrt(n)`. Building rows
`y = 1..B` costs `O(n · B)`, small-`y` queries are then `O(1)` each,
and the direct strides total at most `q · n/B` — with `B = sqrt(n)`
every term lands at `(n + q) · sqrt(n)`, and leaning `B` either way
pays more on the side you just abandoned than it saves on the other.

The modulus is the silent typing constraint. A full suffix reaches
`5 × 10⁴ · 10⁹ = 5 × 10¹³`, far past 32 bits, so table rows hold values
already reduced mod `10⁹ + 7` — plain 32-bit width, since `10⁹ + 6` is
the largest value a row or an answer ever holds — while the build and
the direct strides accumulate in 64 bits and reduce once at the end.
The full table is `B` rows of `n`; ports that group queries by `y` can
build one row at a time and answer from it, keeping the footprint at
`O(n)` with the same running time.

**Complexity:** `O((n + q) * sqrt(n))` time, `O(n * sqrt(n))` space for
the residue tables (`O(n)` when rows are built one `y` at a time).
