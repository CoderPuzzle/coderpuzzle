# Solutions — Ugly Number III

## Binary Search with Inclusion–Exclusion

The key insight is that the counting function `f(x)`, the number of ugly numbers up to `x`, is non-decreasing in `x`. The answer is the smallest `x` with `f(x) >= n`, because that `x` must itself be ugly (if it were not, `f(x)` would equal `f(x-1)` and a smaller witness would exist). Monotonicity makes this a textbook binary search over the value range, which the solution bounds by the guaranteed answer ceiling of `2 * 10^9`.

Counting ugly numbers up to `x` is done in closed form with inclusion–exclusion over the multiples of `a`, `b`, and `c`: add the multiples of each divisor, subtract the multiples of each pairwise least common multiple (which were counted twice), and add back the multiples of `lcm(a, b, c)` (which were subtracted once too often). Floor division gives each term directly. Pairwise and triple least common multiples are derived from `gcd` as `x // gcd(x, y) * y`, dividing first so intermediate values stay as small as possible; Python's arbitrary-precision integers absorb the products of up to `10^18` safely.

The binary search maintains the invariant that the answer lies in `[lo, hi]`, shrinking to the left when `count(mid) >= n` and to the right otherwise, and terminates with `lo == hi` equal to the n-th ugly number; over the `2 · 10⁹`-wide range that is about 31 constant-time counting evaluations. Edge cases like two of `a`, `b`, `c` being equal (or sharing factors) are handled automatically, since the lcm terms collapse correctly rather than double-counting.

**Complexity:** `O(log(2 · 10⁹))` time, `O(1)` space.
