# Solutions — Count Palindromic Subsequences

## Enumerate the center of the palindrome

A length-5 palindrome has the shape `a b c b a`: two outer characters and
two inner characters mirror around a single center. Since the alphabet is
just the ten digits, the outer pair `(a, b)` has only 10 × 10 = 100
possibilities, which is exactly what hint 1 calls out. The canonical
solution instead swaps the loop order to follow hint 2: iterate over the
center position `k` once, and for every ordered pair `(a, b)` multiply the
number of `a b` subsequences lying in `s[0:k]` by the number of `b a`
subsequences lying in `s[k+1:]`. Their product counts the palindromes
`a b s[k] b a` centered at `k`, and the sum over all centers and pairs is
the answer.

The right-side counts come from a suffix table `suff[i][a][b]` holding the
number of `a b` subsequences in `s[i:]`, built in one right-to-left pass:
each new character `d` opens a pair `(d, b)` with every `b` already seen
to its right. The left-side counts are maintained on the fly during the
same left-to-right center sweep — each digit `d` closes every pair
`(a, d)` with the `a`s seen so far. Accumulating products under modulo
`10⁹ + 7` keeps every intermediate value in 64 bits even though the raw
count of length-5 subsequences can reach C(10⁴, 5) ≈ 8.3 × 10¹⁷.

**Complexity:** `O(100·n)` time, `O(100·n)` space — the suffix table holds
100 pair counts for each of the `n + 1` positions.
