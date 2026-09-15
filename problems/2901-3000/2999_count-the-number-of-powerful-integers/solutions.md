# Solutions — Count the Number of Powerful Integers

## Digit DP on the free prefix

A powerful integer is exactly a positive "prefix" followed by the fixed suffix `s`: the number equals `a * 10^len(s) + int(s)` where `a` is either empty or a positive integer whose digits are all at most `limit`. The answer is `count(finish) - count(start - 1)`, and each `count(x)` counts admissible prefixes for the bound `x`.

For a bound `x`: if `x < int(s)` or `s` is longer than `x` itself, nothing qualifies. Otherwise `cap = (x - int(s)) // 10^len(s)` is the largest prefix value still allowed, and the count is 1 for the empty prefix (the number `s` itself, valid because `x >= int(s)`) plus, for every prefix length `p` from 1 up to the digit count of `x` minus `len(s)`, the number of `p`-digit integers whose digits are all at most `limit` and whose value is at most `cap`. A longer total length would already exceed `x`, and shorter lengths fall out of the same loop.

`count_exact_len` handles each length `p` in three regimes: if `cap` is below `10^(p-1)` there are no valid `p`-digit prefixes; if `cap` reaches `10^p - 1` every `limit`-restricted `p`-digit number works, giving the closed form `limit * (limit+1)^(p-1)` (first digit 1..limit, the rest 0..limit); otherwise `cap` has exactly `p` digits and a small digit DP walks its digits with a `tight` flag, forcing a nonzero leading digit and branching over each digit up to `min(current cap digit or 9, limit)`. Writing `D` for the digit count of `finish` (at most 16, with `limit <= 9`), the whole computation is tiny; `start - 1` can be 0, which correctly yields 0.

**Complexity:** `O(D^2 * limit)` time, `O(D)` space.
