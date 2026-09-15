# Solutions — Sum Multiples

## Direct Divisibility Scan

One pass over `[1, n]` accumulating every value divisible by 3, 5, or 7.
The single `or` chain is the whole correctness story: shared multiples
such as 15, 21, or 35 satisfy more than one divisibility test but must be
counted exactly once, and short-circuiting on the first hit does that
naturally — no inclusion–exclusion subtraction is needed to avoid
double-counting.

The bound keeps everything trivially safe: with `n <= 1000` the largest
possible answer is far below 260000, comfortably inside one machine int in
every offered language, so no wide-arithmetic care applies.

**Complexity:** `O(n)` time, `O(1)` space.
