# Solutions — Number of Beautiful Integers in the Range

## Digit DP over Prefixes

Count beautiful integers up to a bound with `f(n) = count of beautiful integers in [1, n]`, and return `f(high) - f(low - 1)`. Counting directly over the range is hopeless because the bound reaches `10^9`, but a digit DP walks the decimal digits of `n` once while tracking everything the two conditions need: the running digit count balance and the running value modulo `k`.

The state is `(pos, tight, started, balance, mod)`. `pos` is the current digit index; `tight` records whether the prefix built so far still equals the bound's prefix (which caps the next digit at the bound's digit, otherwise digits go up to 9); `started` distinguishes leading zeros — a leading zero contributes nothing, so it neither changes the balance nor counts as an even digit, which matters because numbers like `10` must be seen as one odd and one even digit. `balance` is the odd-digit count minus the even-digit count of the digits written so far, and `mod` is the number formed so far modulo `k`. At the last position a state succeeds if at least one digit was written, the balance is zero, and the residue is zero.

The balance stays small — it is bounded by the number of digits, at most ten — so the memoized state space is compact, on the order of `positions x balance values x residues`. Each state branches over at most ten digits. Memoization is what makes this fast: within one bound, all the loose (non-tight) subproblems are shared, so the recursion effectively enumerates states, not numbers. `f(0)` returns 0, handling `low = 1` where `low - 1 = 0` contributes nothing.

**Complexity:** `O(D^2 * k)` time, `O(D^2 * k)` space, with `D <= 10` the digit count of `high`.
