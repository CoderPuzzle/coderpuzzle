# Solutions — Check Divisibility by Digit Sum and Product

## One-Pass Digit Aggregation

Peel the digits of `n` once with repeated division by ten, folding them
into two accumulators as they come off: a running digit sum and a running
digit product. The divisor is then simply `sum + product`, and `n` is
divisible exactly when `n % (sum + product)` is zero.

Two small facts keep the check safe and cheap. The digit sum of a
positive integer is at least 1, so the divisor can never be zero even
when the product collapses — any zero digit zeroes the product but leaves
a valid divisor. And since `n ≤ 10⁶` has at most seven digits, the
product never exceeds `9⁷`, so 32-bit accumulators are comfortable in
every language.

**Complexity:** `O(log₁₀ n)` time, `O(1)` space.
