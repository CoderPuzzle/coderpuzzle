# Solutions — Sum of Digits in Base K

Converting `n` to base `k` by hand means dividing by `k` repeatedly and
reading the remainders — the remainder of the first division is the last
digit, and so on. The digit sum does not care about order, so there is no
need to collect or reverse the digits at all: each remainder can be added
into the running total as it is produced.

## Repeated division, accumulate remainders

While `n` is positive, add `n % k` (the current least-significant base-`k`
digit) to the total and replace `n` with `n / k` (integer division), which
strips that digit. When the loop ends, `n` has been fully consumed and the
total is exactly the base-`k` digit sum. Example 1 runs `34 % 6 = 4`,
`34 / 6 = 5`, then `5 % 6 = 5`, `5 / 6 = 0` — digits `5, 4`, sum `9`.

Every value stays tiny: `n ≤ 100`, each remainder is below `k ≤ 10`, and
the total is at most `100`'s worth of digits (six binary digits of `1`,
summing to 6; at most 17 in the worst corner). The loop runs once per
digit of `n` in base `k`, which is at most logarithmic in `n`. An
exhaustive check over every `(n, k)` in the constraint ranges matches a
from-scratch string conversion.

**Complexity:** `O(log_k n)` time, `O(1)` space.
