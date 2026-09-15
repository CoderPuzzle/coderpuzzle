# Solutions — Check if Point Is Reachable

## GCD power-of-two invariant

Watch only the odd part of `gcd(x, y)` as moves are applied. A subtractive
move maps `(x, y)` to `(x, y − x)`, which leaves the gcd untouched — that
is exactly the Euclidean identity. A doubling move multiplies one
coordinate by two, and `gcd(2x, y)` differs from `gcd(x, y)` by at most a
factor of two, so doublings can inject powers of two into the gcd but can
never create or destroy its odd prime factors. Starting from (1, 1), whose
gcd's odd part is 1, every reachable point must therefore have a gcd that
is a power of two, as hint 3 suggests.

The converse is constructive when you walk the reverse move set of hint 1:
from any point whose gcd is `2^k` you can reach (1, 1) by peeling factors
of two off even coordinates, and when both coordinates turn out odd you
fold one into the other, which makes the enlarged coordinate even and lets
the halvings resume — a Euclid-flavored descent whose recorded steps
invert, move for move, into a legal forward path from (1, 1). So the
predicate "reachable" coincides exactly with "gcd is a power of two."

Computing one Euclid gcd on values up to `10⁹` costs `O(log max)` machine-
word steps; the power-of-two test is the standard bit trick `g & (g − 1)
== 0`. Nothing exceeds 32-bit width anywhere: coordinates stay ≤ `10⁹`,
and the odd-part argument guarantees the gcd does too.

**Complexity:** `O(log(min(targetX, targetY)))` time, `O(1)` space.
