# Solutions — Count the Number of Houses at a Certain Distance II

## Chain baseline with shortcut corrections

Every pair's distance is either its chain distance `a - b` or, strictly
shorter, a trip that uses the extra street once: walk from `a` to one
endpoint, cross it, walk to the other target. Order `x` and `y` so that
`x < y`, compare the two trip lengths against the chain distance, and the
improving pairs fall into four families: straddling pairs (`a < x`, `b > y`)
shorten by `span - 1` where `span = y - x`; a house left of `x` with a
partner in the segment's right half (past the midpoint of `x` and `y`) lands
on `x + y + 1 - a - b`; symmetrically a partner right of `y` with an
in-segment house in its left half lands on `a + b - x - y + 1`; and two
houses inside the segment whose gap exceeds half its length collapse onto
the mirrored position `span + 1 - gap`. Every other pair keeps its chain
distance, and equal-length ties change nothing.

So start from the closed-form baseline — without the extra street, chain
distance `k` carries exactly `2 * (n - k)` ordered pairs — and move only the
improving pairs. Sweeping one endpoint turns each family into a constant
number of intervals over distance buckets: leavers and arrivals go into two
difference arrays, which prefix into exact per-bucket counts; the in-segment
family carries exact weights (`span + 1` houses give gap `g` exactly
`span + 1 - g` pairs) and merges in after prefixing. Each improving
unordered pair then shifts twice — out of its old bucket, into its shortened
one — doubled for ordering, so one linear pass over the buckets finishes the
answer.

**Complexity:** `O(n)` time, `O(n)` space.
