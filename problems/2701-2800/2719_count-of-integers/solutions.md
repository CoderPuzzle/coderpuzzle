# Solutions — Count of Integers

## Digit DP

Count good integers up to a bound and subtract: the answer is `f(num2) - f(num1 - 1)`, where the string-based decrement borrows across trailing zeros and strips leading zeros, leaving `"0"` only when the input was all zeros (impossible here since `num1 >= 1`). Both `f` evaluations use the same routine, and the difference is taken modulo `10^9 + 7`.

`f(s)` is a digit DP computed backwards over the `m` positions of `s`. The state is a pair of flags — tight, meaning the digits chosen so far still match the bound's prefix exactly, or free — crossed with the accumulated digit sum, which is capped at `max_sum` because digit sums only grow, so any branch already past the cap can never return to range; the code prunes it by breaking the digit loop as soon as `sm + d` exceeds `max_sum`. The base case after the last position scores a state 1 exactly when the accumulated sum has reached `min_sum`, and the transition tries digits `0..limit` (the bound's digit while tight, 9 otherwise), staying tight only when the chosen digit equals the limit. The result is read from the tight state with an empty accumulated sum.

Rolling just two rows per position keeps memory proportional to `max_sum` rather than `m * max_sum`. The digit count `m` is at most 23 and `max_sum` at most 400, so each call does roughly `2 * 401 * 10` transitions per position — a few hundred thousand operations in total.

**Complexity:** `O(m * max_sum)` time, `O(max_sum)` space.
