# Solutions — Smallest Divisible Digit Product I

## Incremental Digit-Product Search

The search space above `n` is tiny, so the honest approach is to walk it
directly: test `n`, and while the product of its digits is not divisible by
`t`, move to the next integer. The digit product is computed by peeling —
multiply a running product by `value % 10` and drop the last digit until
the value is gone; a number containing a `0` digit ends with product `0`,
which every `t >= 1` divides.

The walk cannot run long: any ten consecutive integers contain a multiple
of `10`, whose digit product `0` is divisible by every `t`, so at most ten
candidates are ever tested (as the hint promises) and each has at most
three digits within the constraints. Everything stays far inside 32-bit
range — the product of three digits is at most `9³ = 729`.

**Complexity:** `O(1)` time, `O(1)` space — at most ten candidates of at
most three digits each.
