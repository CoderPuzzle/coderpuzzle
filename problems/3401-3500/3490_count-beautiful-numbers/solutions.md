# Solutions — Count Beautiful Numbers

## Digit DP over Sum and Product

Count beautiful numbers up to `x` with a digit DP and take the difference `f(r) - f(l - 1)`. Building the decimal representation of a number position by position, the only quantities that decide beauty are the digit sum `ssum` and the digit product `prod`, so the state is `(pos, tight, started, ssum, prod)`: `pos` is how many digits are placed, `tight` whether the prefix equals `x`'s prefix (capping the next digit at `x`'s digit instead of 9), and `started` whether a nonzero digit has appeared, so that leading zeros do not count toward either sum or product. Memoization on the full state makes the recursion evaluate each reachable state once per `x`.

Zeros deserve care. A zero digit among the significant digits makes the product zero, and zero is divisible by any positive digit sum, so every number containing a 0 digit is automatically beautiful; the recursion models this by multiplying `prod` by `d` (making it 0) while continuing to add to `ssum`. Leading zeros are the opposite case — the not-yet-started branch keeps `ssum = 0, prod = 1` so they contaminate nothing. At `pos == len(digits)` a state counts iff the number actually started and `ssum > 0` and `prod % ssum == 0`.

The state space stays tiny: at most 10 positions, two `tight` and two `started` flags, digit sums up to 81, and the reachable nonzero products of digits 1–9 across at most 10 positions — a few thousand distinct values. The `lru_cache` is scoped inside `_count`, so the memo is rebuilt independently for `r` and `l - 1` (the digit strings differ), which is required for correctness of the `tight` transitions.

Edge cases: `l = 1` (single-digit numbers are beautiful since product equals sum), numbers like 10 and 20 (containing 0, product 0 divisible by sum 1 and 2), and `x <= 0` short-circuiting to 0 for the lower boundary call.

**Complexity:** `O(D * S * P)` time, `O(D * S * P)` space per bound, where `D <= 10` digit positions, `S <= 91` reachable digit sums, and `P` is the set of reachable digit products (a few thousand values), each state looping over at most 10 digits.
