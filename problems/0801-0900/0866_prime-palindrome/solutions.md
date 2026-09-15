# Solutions — Prime Palindrome

Intersecting two sparse properties by scanning integers is hopeless at the top
of the range, but each property hands the search a structural gift: a
palindrome is rebuilt from nothing but its left half, and one divisibility
fact disqualifies every palindrome with an even number of digits at once. The
method therefore enumerates palindromes in increasing order and spends its
only real work — trial division — on the few of them that reach `n` before a
prime appears.

## Mirror halves in order, skipping the even lengths

A palindrome is determined by its first half: appending that half's digits in
reverse, minus the final digit, rebuilds an odd-length palindrome, and
stepping the half upward walks one length class's palindromes in increasing
order. Below 12 every prime — 2, 3, 5, 7, 11 — is itself a palindrome, so
`n <= 11` is answered by climbing integers from `max(n, 2)` until a prime
appears, which happens by 11 at the latest.

Above 11 the even lengths vanish entirely: in a palindrome with an even number
of digits each digit's mirror sits at opposite alternating-sign positions, so
the alternating digit sum is 0 and the number is divisible by 11 — 11 itself
is the family's only prime. The scan thus visits only odd lengths, halves
`10..99` for three digits, `100..999` for five, and so on, and tests each
palindrome `>= n` by trial division up to its square root — 2 first, then odd
divisors only. From the largest seven-digit prime palindrome, 9989899, the
next answer is 100030001, reached after examining just four candidates,
because the whole eight-digit range is divisible by 11 and never even
constructed.

The guarantee that the answer lies in `[2, 2 * 10⁸]` keeps the search inside
the nine-digit class, which also bounds the arithmetic: the largest value
ever built, 999999999, and every trial divisor's square stay below 2³¹, so
the fixed-width languages carry the whole computation in 32-bit integers;
Python's integers are unbounded, and the JavaScript and TypeScript values
stay exact far below 2⁵³.

**Complexity:** `O(√A · c)` time for the `c` palindromes examined before the
answer `A` — a few thousand at worst across the whole input range — `O(1)`
space.
