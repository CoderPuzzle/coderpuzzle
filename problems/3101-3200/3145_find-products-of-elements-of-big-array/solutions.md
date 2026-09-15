# Solutions — Find Products of Elements of Big Array

## Prefix bit-counting with binary search

Every element of big_nums is a power of two, so a product over any range is 2 raised to the sum of the exponents — and the answer modulo mod is pow(2, exp, mod). Concatenating the powerful arrays of 1, 2, 3, ... is exactly concatenating the binary representations of those integers with each number's set bits listed lowest first, so the task shrinks to prefix sums of "how many set bits" and "sum of bit positions" over the integers 1..M.

Both prefixes rest on _count_bit(M, b), the count of integers in [1, M] with bit b set, computed in closed form: full periods of length 2^(b+1) each contribute 2^b ones, plus the partial cycle contributes the overlap of the remainder beyond the 2^b offset. _popcount_prefix sums those counts over all bits (the total length of big_nums contributed by 1..M) and _bitsum_prefix weights each bit by its position b (the total exponent). Each is just a loop over the log2(M) bit positions.

_exponent_sum(n) — the exponent sum of the first n elements of big_nums — binary-searches the largest M whose cumulative bit count fits within n, takes bitsum_prefix(M) for the complete numbers, then consumes the remaining elements from M + 1's set bits in ascending bit order, which is precisely the order they appear in big_nums. A query [from, to] then needs only the difference of two such prefix evaluations, so the enormous array is never touched.

**Complexity:** `O(q · log² N)` time (N = 10¹⁵, the query index bound), `O(1)` space.
