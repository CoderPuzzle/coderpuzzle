# Solutions — Check Good Integer

## Digit accumulation

Extract each decimal digit by repeatedly taking `n % 10`. Accumulate the
plain digit into `digitSum` and the squared digit into `squareSum`, then
divide `n` by 10.

The final test is `squareSum - digitSum >= 50`.

**Complexity:** `O(log n)` time, `O(1)` space.
