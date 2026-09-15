# Solutions — Find the Count of Good Integers

## Palindrome enumeration with multiset counting

A good integer is a rearrangement of a k-palindrome, and a palindrome of length n is fixed by its first ceil(n/2) digits, so only 10^ceil(n/2) candidates need enumerating — each half is mirrored (with the middle digit shared when n is odd), and candidates with a leading zero or not divisible by k are dropped on the spot. What survives is reduced to its digit-count vector and pushed into a set, so identical digit multisets arising from different palindromes are counted once.

For each distinct multiset, the number of distinct n-digit integers having exactly those digits is the multinomial n! / prod(c_d!), since rearrangements of the same multiset give the same set of integers regardless of which palindrome produced it. Arrangements with a leading zero are not n-digit numbers, so when the zero count is positive the subtraction removes (n-1)! / ((c_0 - 1)! · prod_{d>0} c_d!) — fix a zero in front and permute the rest.

Summing over the deduplicated multisets counts every good integer exactly once: each good integer's digit multiset is counted in total arrangements, and each arrangement is one concrete integer, distinct across multisets. With n <= 10 the enumeration tops out at 10⁵ candidates and the factorials are tabulated once.

**Complexity:** `O(10^⌈n/2⌉ · n)` time, `O(10^⌈n/2⌉)` space.
