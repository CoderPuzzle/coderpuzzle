# Solutions — Greatest Common Divisor of Strings

If a string `x` divides both `str1` and `str2`, then `str1` and `str2` are
both built from repetitions of `x`, so `str1 + str2` and `str2 + str1` are
both just `x` repeated `len(str1)/len(x) + len(str2)/len(x)` times in the
same order — meaning `str1 + str2 == str2 + str1`. The converse also
holds: whenever that concatenation-commutes equality is true, a common
divisor exists, and it must be the prefix of length
`gcd(len(str1), len(str2))` (any common divisor's length must divide both
string lengths, and the largest such length is exactly that GCD). So the
whole problem reduces to one equality check plus one GCD.

## Concatenation-commutes check plus Euclidean GCD

First test whether `str1 + str2 == str2 + str1`; if not, no string can
divide both, so the answer is `""`. If the equality holds, compute
`g = gcd(len(str1), len(str2))` with the Euclidean algorithm and return
the length-`g` prefix of `str1` (equivalently of `str2`, since the
equality guarantees they agree on that prefix).

**Complexity:** `O(m + n)` time, `O(m + n)` space, where `m = len(str1)`
and `n = len(str2)` (dominated by building the two concatenations to
compare).
