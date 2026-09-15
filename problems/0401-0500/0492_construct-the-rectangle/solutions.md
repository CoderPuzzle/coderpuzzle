# Solutions — Construct the Rectangle

## Largest divisor at or below the square root

Every factorization `L * W = area` pairs a divisor above the square root with
one below it, and requirement 2 pins the answer to the below-root half: `W` is
at most `sqrt(area)` exactly when its cofactor `L = area / W` is at least `W`.
Among those pairs the difference `L - W` shrinks as `W` grows — a wider width
pulls the length `area / W` down toward it — so requirement 3 asks for the same
thing from the other side. The target is one number: the largest divisor of
`area` that does not exceed `sqrt(area)`. Example 1's enumeration shows the
rule at work on `area = 4`: of `[1,4]`, `[2,2]`, `[4,1]` the illegal `[1,4]`
and the mirrored `[4,1]` fall away, and the pair whose width sits exactly at
the square root remains.

That target suggests the search itself: start `w` at the integer square root
of `area` and step down until `area % w == 0`. The first divisor found is the
widest valid width, so the answer is `[area / w, w]`; `w = 1` divides
everything, so the walk always terminates. A perfect square answers on the
first probe (`area = 4` returns `[2,2]` at once), while a prime must walk the
whole way down to `[p, 1]` — that is the worst case, and it is cheap: near the
domain ceiling `10^7` the root is only 3162, so even the largest prime below
the ceiling costs a few thousand constant-time probes, and `area = 122122`
from Example 3 lands on `[427,286]` after stepping from 349 down to 286.

The one care point is the starting root. A floating-point square root floored
to an integer can sit one to either side of the true `floor(sqrt(area))`, and
both sides corrupt the answer: starting below can skip a square's balanced
pair (`area = 4` starting at `w = 1` would return `[4,1]`), and starting above
can accept a divisor with `W > L` (`area = 12` starting at `w = 4` would
return `[3,4]`). Python's `math.isqrt` is exact by specification; the
fixed-width languages floor the float root and then settle it with two exact
integer adjustment loops before the descent begins.

**Complexity:** `O(sqrt(area))` time in the worst case, `O(1)` space.
