# Solutions — Number of Beautiful Pairs

## Pairwise scan with a gcd check

A pair is beautiful exactly when two specific digits are coprime: the first
digit of `nums[i]` and the last digit of `nums[j]`. Nothing about the pair
depends on any other element, so with `n <= 100` the direct move is to walk
every `(i, j)` with `i < j` — at most 4950 pairs — and test each one.

Both digits live in `1..9`: the leading digit of a positive number is never
zero, and the constraint `nums[i] % 10 != 0` keeps every last digit nonzero.
The coprimality test is therefore a tiny Euclidean gcd on single digits, plus
the special case Example 2 pins down: `gcd(1, 1) == 1`, so a first digit of 1
pairs beautifully with every last digit, even another 1.

The first digit falls out of the decimal representation — the leading
character of the number as a string, or repeated division by 10 — and the
last digit is `nums[j] % 10`. The answer is the count of pairs whose digits
pass the gcd test.

**Complexity:** `O(n²)` time, `O(1)` space.
