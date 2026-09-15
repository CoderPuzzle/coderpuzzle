# Solutions — Numbers With Repeated Digits

## Complement counting of distinct-digit numbers

Counting numbers with a repeated digit directly is awkward; counting the complement is clean. The solution tallies `distinct`, the quantity of integers in `[1, n]` whose digits are all different, and returns `n - distinct`. Two independent pieces build that tally.

The first piece covers every length strictly shorter than `n`: a `d`-digit number has 9 choices for its first digit (no leading zero) and then 9, 8, 7, ... choices as digits run out, which `distinct_count(d)` multiplies out. The second piece walks `n`'s own digit string prefix by prefix. At position `i`, for every candidate digit smaller than `digits[i]` that is not already used by the prefix, the remaining positions can hold any permutation of unused digits — the code counts eligible candidates and multiplies by the falling product `avail * (avail - 1) * ...`. If `digits[i]` itself repeats an earlier digit, no longer number shares this prefix, so the walk breaks; otherwise the digit is committed to `used`. If the walk never breaks, `n` itself has all-distinct digits and contributes a final `+1`.

Because `n` has at most 10 digits, the candidate scan is bounded by 10 and each falling product by 10 factors, so the whole computation is a few hundred operations even at `n` near a billion. Small `n` degenerates gracefully: for a single-digit `n`, the shorter-length loop contributes nothing beyond the prefix walk, `distinct` reaches `n`, and the answer is 0.

**Complexity:** `O(log^2 n)` time, `O(log n)` space for the digit list and used set.
