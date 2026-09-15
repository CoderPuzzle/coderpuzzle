# Solutions — Count Special Integers

## Digit DP with combinatorial counting

Counting special integers in `[1, n]` splits into two independent parts: every special number with strictly fewer digits than `n` (all of which are below `n`), and the special numbers with exactly as many digits as `n` that are at most `n`. Let `D` be the number of digits of `n` (at most 10, since `n <= 2 * 10^9`). The first part is pure combinatorics, and the second part is a digit walk over `n` itself that carries a bitmask of the digits already fixed in the prefix.

For the shorter lengths, a `k`-digit special number has 9 choices for the first digit (1 through 9, no leading zero) and then `k - 1` ordered picks from the remaining 9 digits, giving `9 * perm(9, k - 1)` numbers for each `k < D`. For the same-length candidates, walk the digits of `n` from the most significant position. At position `i`, holding the prefix equal to `n`'s first `i` digits, try every digit `x` smaller than `n`'s digit `d` (with `x >= 1` at position 0 to exclude leading zeros, `x >= 0` afterwards) that does not appear in the used-mask. Any completion of such a prefix is valid, and the remaining `D - i - 1` positions are filled by ordered picks from the `10 - (i + 1)` still-unused digits, contributing `perm(10 - (i + 1), D - i - 1)` numbers each.

After trying the smaller digits at position `i`, the digit `d` itself joins the prefix; if `d` was already used, the prefix repeats a digit, no same-length special number shares this prefix, and the walk stops early. If the walk finishes all `D` positions without a repeat, `n` itself is special and adds one more. Single-digit `n` falls out naturally (the answer is `n`), and the whole computation is a few hundred operations because `D <= 10`.

**Complexity:** `O(D^2)` time, `O(D)` space.
