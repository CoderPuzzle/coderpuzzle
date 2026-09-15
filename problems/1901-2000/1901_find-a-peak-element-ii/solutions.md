# Solutions — Find a Peak Element II

Two halvings of the row range, each paying for its decision with a scan of one
row. One compares the maxima of two adjacent rows and follows the climb — a
global argument that leans on the judge's promise of a single peak. The other
interrogates the middle row's largest entry through its vertical neighbors —
a local question whose answer holds for any matrix.

## Unimodal Row Maxima

The judge builds each matrix with exactly one peak, and that promise is
worth a whole proof. A peak is strictly greater than every neighbor, so
the grid's global maximum — which beats everything, neighbors included —
is always a peak; with only one peak in the grid, the peak _is_ the global
maximum. Call its row `i*`.

Now watch the row maxima `R[r]` — the largest entry of each row — as a
sequence down the matrix. Above `i*` it climbs strictly. Row 0's maximum
cannot be beaten within its own row and has nothing above it, so it must
be beaten from below: `R[0] < R[1]`. From there upward, take row `r`'s
maximum with `r < i*`: horizontal neighbors cannot beat it (it tops its
own row, and adjacent cells never tie), and it is not the peak, so some
neighbor beats it. If that neighbor were the cell above, it would force
`R[r-1] > R[r]`, contradicting the rise just established for the pair
below — so the winner is below, `R[r] < R[r+1]`. The argument mirrored
from the bottom row makes the maxima fall strictly after `i*`. The
sequence `R` is therefore strictly unimodal, its summit at `i*`.

That turns the problem into textbook binary search on a unimodal
sequence: compare `R[mid]` with `R[mid + 1]`, keep the larger side, halve
until one row remains, and return that row's maximum — the peak itself.
Both examples resolve in a step or two: `[9, 5]` falls from row 0, so
row 0 wins immediately; `[12, 31, 17]` rises then falls, and both
halvings land on row 1.

The bill is two row scans per halving instead of one, so the asymptotics
match the other method — `O(n log m)` — while the reasoning differs:
this one trusts the unique-peak promise (with several peaks the row
maxima need not be unimodal at all), whereas the vertical-neighbor
search never uses it.

**Complexity:** `O(n log m)` time, `O(1)` space.

## Binary search on rows via the row maximum

The row maximum is the pivot of the search. Pick the middle row, find its largest entry in one scan — that entry already beats its left and right neighbors by construction, so only the vertical direction can disqualify it. Compare it with the cells directly above and below (the `-1` perimeter outside the grid). If it beats both, it is a peak and the search ends; otherwise the strictly larger vertical neighbor points the way.

Moving toward that larger neighbor is safe by a maximality argument. Suppose the up-neighbor wins, so `mat[mid-1][j] > mat[mid][j]`, and every cell of row `mid` is at most `mat[mid][j]` (it is the row maximum). Restrict attention to the top half, rows `lo..mid-1`, and take its maximum element: all of its neighbors inside the half are smaller, and its only neighbor that could lie outside — the cell below it, in row `mid` — is smaller too, because the entire row `mid` is below `mat[mid-1][j]`, itself at most the half's maximum. So the half's maximum is a peak of the whole matrix, and recursing there (setting `hi = mid - 1`) cannot lose the answer. The down-neighbor case mirrors it onto the bottom half.

Each iteration scans one row of length `n` and halves the row range, and the loop must terminate at a peak since a peak always exists in the retained half. Single-row and single-column matrices are covered by the `-1` perimeter guards on the out-of-range neighbor lookups.

**Complexity:** `O(n log m)` time, `O(1)` space.
