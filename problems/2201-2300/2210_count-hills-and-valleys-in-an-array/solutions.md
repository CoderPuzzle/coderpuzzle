# Solutions — Count Hills and Valleys in an Array

## Run compression, then interior extrema

Every index inside a maximal run of equal values has the same closest
non-equal neighbors — the value just left of the run and the value just
right of it — so an entire run is a hill, a valley, or neither as one unit.
Collapsing each run to a single representative therefore loses nothing and
resolves the statement's "adjacent equal indices are the same hill or
valley" rule mechanically: duplicates cannot be double-counted because they
no longer exist as separate entries.

On the compressed sequence the definition becomes the classic local-extremum
test: an interior entry whose neighbors on both sides are smaller is a hill,
one whose neighbors are both larger is a valley. Restricting the loop to
interior positions encodes the other rule exactly — the first and last
representatives lack a non-equal neighbor on one side, which is what
disqualifies them. For `[2,4,1,1,6,5]` the compression is `[2,4,1,6,5]`,
whose interior entries `4`, `1`, and `6` are a hill, a valley, and a hill.

With `nums.length ≤ 100` everything fits trivially: one pass builds the
compression, one pass counts, and no value ever leaves the small-integer
range.

**Complexity:** `O(n)` time, `O(n)` space.
