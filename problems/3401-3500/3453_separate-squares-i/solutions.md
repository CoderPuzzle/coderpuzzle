# Solutions — Separate Squares I

## Binary Search on the Line Height

The total area strictly below a horizontal line at height `y` is a continuous, non-decreasing function of `y`: each square contributes `l * min(max(y - y_i, 0), l)` — its width times the clipped height of the part under the line. It is 0 at `y = 0` and reaches the full total area once `y` passes the tallest square's top, so by monotonicity the smallest `y` where the area below reaches half the total is exactly the answer we want, and it can be found by binary search. Overlaps are counted with multiplicity here, which is precisely what this per-square sum computes.

The search runs over `[0, max(y_i + l_i)]` for a fixed 60 iterations, halving the interval each time. Each evaluation of the midpoint sweeps all squares in linear time, comparing `below(mid)` against `target = total / 2`: if the lower half already holds at least half the area, the answer lies at or below `mid` (`hi = mid`); otherwise it lies above (`lo = mid`). Sixty iterations shrink the interval far below the required `10^-5` tolerance even for coordinates up to `10^9`, and returning `hi` gives the minimal qualifying height.

Two details keep it numerically safe: only the total is computed once outside the loop, and each square's contribution clamps both at its bottom (`mid <= y` contributes nothing) and at its top (`min(mid, y + l)`), so no square can contribute more than its area or a negative amount. Floating-point precision is ample because every quantity is at most around `10^12` and the loop performs no subtraction of nearly equal large numbers other than the bounded clamps.

Edge cases: a single square (answer its vertical midpoint), stacked or identical squares (areas add), and the flat region where the below-area equals the target over an interval of heights — the `>= target` comparison steers the search to the leftmost such `y`, matching "minimum y-coordinate" in example 1.

**Complexity:** `O(60 * n)` time, `O(1)` extra space.
