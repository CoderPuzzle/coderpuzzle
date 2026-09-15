# Solutions — Sum of Square Numbers

## Two pointers on the square range

A witness `a² + b² = c` confines both of its roots: neither `a` nor `b` can
pass `isqrt(c)`, because the larger root's square alone would already top `c`.
Every candidate pair therefore lives in the triangle
`0 <= a <= b <= isqrt(c)`, and across that triangle the total `a² + b²` rises
as `a` grows and falls as `b` shrinks — exactly the trade two pointers walk.
`a` starts at 0 and `b` at `isqrt(c)`; each probe compares `a² + b²` against
`c`. A shortfall grows `a`, an overshoot shrinks `b`, an exact hit is the
witness, and a window that closes at `a > b` means none exists. Example 1
converges at once — `0² + 2² = 4` falls short, then `1² + 2² = 5` hits —
while Example 2 exhausts its whole window, `0² + 1²` and `1² + 1²` both
below 3, and exits `false`.

The starting root must be exact: a `b` seeded below `isqrt(c)` can skip the
only witness pair, and a float square root rounded to an integer can sit on
either side. Python takes `math.isqrt`, exact by specification; the
fixed-width languages never touch the float root at all. `b` starts at
`46341` — the first integer whose square passes the constraint ceiling
`2³¹ - 1` — and steps down while `b² > c`: an exact integer descent that
lands on `isqrt(c)` from above, at most a few thousand constant-time steps
before the sweep proper begins.

The probe, not the search, carries the width. `b` can sit at `46340`, whose
square `2147395600` still fits a 32-bit signed integer, but the probe sums
two squares: at the ceiling `c = 2³¹ - 1` the running total reaches
`297² + 46340² = 2147483809`, past the 32-bit cap before `b` gets its chance
to step down. Java, C++, and Rust hold the roots and the total in 64-bit
types (`long`, `long long`, `i64`); Go's `int` already is one on every
platform the judge runs; Python's integers are arbitrary-precision. The
double-only pair, JavaScript and TypeScript, can square directly after all:
they count integers exactly through `2⁵³ ≈ 9 × 10¹⁵`, and every value in
play stays under `2 × 46341² ≈ 4.3 × 10⁹`.

**Complexity:** `O(sqrt(c))` time, `O(1)` space.
