# Solutions — Check if Number is a Sum of Powers of Three

Distinctness is what turns this from an unbounded search into a notation
question: each power of three may appear at most once, so a representable
`n` is exactly a ternary numeral written with only 0s and 1s.

## Ternary digits without a 2

Write `n` in base 3. A sum of distinct powers of three contributes a single
1 to exactly one ternary position and nothing elsewhere, and positional
uniqueness runs the other way too: since every coefficient 0 or 1 is its own
ternary digit, `n` is representable precisely when its ternary expansion
contains no digit 2. The check is then a strip of divisions — take `n % 3`
each round, fail on a 2, else drop the last digit with `n /= 3` — and the
answer is `true` once the digits run out: `12` peels `0, 1, 1` (it is
`110₃ = 3¹ + 3²`) while `21` peels `0, 1, 2` (`210₃`, the 2 kills it, and
reusing `3²` twice is exactly what distinctness forbids).

The loop is iterative and short: `n <= 10⁷ < 3¹⁵`, so at most fifteen
iterations touch values no larger than `n` itself — no accumulation, no
recursion, and every intermediate fits a 32-bit integer in every language
(exact small integers in the JS runtimes). The one boundary worth naming is
that `7174453 = 1 + 3 + ... + 3¹⁴ = (3¹⁵ - 1) / 2` is the largest
representable value, so everything from `7174454` up to the `10⁷` ceiling
answers `false`.

**Complexity:** `O(log n)` time, `O(1)` space.
