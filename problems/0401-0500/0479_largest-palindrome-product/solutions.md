# Solutions — Largest Palindrome Product

## Search palindromes, not products

The factor pairs of two n-digit numbers number `(9 × 10ⁿ⁻¹)²`, but a
2n-digit palindrome is fixed entirely by its first half — there are only
`9 × 10ⁿ⁻¹` candidates, and they can be visited largest-first without
forming a single product. So the method enumerates halves from `10ⁿ − 1`
downward, mirrors each into its palindrome, and asks one question: does it
factor into two n-digit numbers? The first candidate that answers yes is
necessarily the maximum, and the search stops right there — for `n = 8` the
winner sits 10,000 halves below the top, a sliver of the `8.1 × 10¹⁵` pairs
a product-first search would have to wade through.

The divisor test rides on one ordering fact: in any pair `a ≤ b` with
`a·b = p`, the larger factor satisfies `b ≥ √p`, so scanning from
`10ⁿ − 1` down to the integer square root meets every pair that can exist,
and `p mod factor = 0` with the cofactor `p / factor` inside
`[10ⁿ⁻¹, 10ⁿ − 1]` certifies the split. The cofactor bound earns its keep at
once: the very first candidate `10²ⁿ − 1` factors as
`(10ⁿ − 1)(10ⁿ + 1)`, and the second factor's extra digit is exactly what
the bound rejects. `n = 1` stands apart — every 2-digit palindrome is a
multiple of 11, out of reach of two 1-digit factors, so the answer is the
1-digit palindrome `9 = 3 × 3`, returned directly.

Candidates approach `10¹⁶`, past the 32-bit range and beyond `2⁵³`, the edge
of exact doubles: fixed-width languages compute in 64-bit integers and the
JavaScript variants carry the palindrome and its factors in BigInt, with
each square-root estimate settled to an exact floor by adjustment. The
closing reduction modulo 1337 brings every language back to a plain small
integer, as the statement demands.

**Complexity:** at most `9 × 10ⁿ⁻¹` palindrome candidates, each with a
divisor scan of at most `10ⁿ − ⌈√p⌉` steps — `O(10²ⁿ)` time in the worst
case, `O(n)` space.
