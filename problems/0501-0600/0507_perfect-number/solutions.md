# Solutions — Perfect Number

## Paired divisor sum

Proper divisors come in pairs that meet around the square root: whenever `i`
divides `num` exactly, so does `num / i`, and the smaller member of the pair
never sits above `sqrt(num)`. The scan therefore seeds its running total with
`1` — the partner of `num` itself, which the definition excludes — and walks
candidates `i = 2, 3, …` only while `i * i <= num`, adding both `i` and
`num / i` on every clean division. A candidate that lands exactly on the
square root is its own partner and counts once, and `num <= 1` has no proper
divisors at all, so it is turned away before the loop starts. For `num = 28`
the walk collects `1 + 2 + 14 + 4 + 7 = 28` and answers `true`; for `num = 7`
nothing beyond the seed ever lands, and `1 != 7`.

Perfect numbers are astonishingly scarce: below the statement's ceiling of
`10⁸` exactly five exist — `6`, `28`, `496`, `8128`, and `33550336` — so
nearly every input is refused after a scan of at most `10⁴` candidates. That
bound also keeps the arithmetic tame: `i` never exceeds `10⁴`, `i * i` never
exceeds `10⁸`, and the divisor sum of any number in the domain stays below
roughly `5.4` times the number itself — comfortable range for the fixed-width
integers and still exact ground for the double-only pair.

**Complexity:** `O(sqrt(num))` time, `O(1)` space.
