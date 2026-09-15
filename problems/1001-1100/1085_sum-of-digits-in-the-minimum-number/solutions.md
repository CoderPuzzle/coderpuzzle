# Solutions — Sum of Digits in the Minimum Number

## Find the minimum, then sum its digits

The answer depends only on the smallest element of `nums`, so the array
is scanned once to find it. Once the minimum `m` is known, its digit sum
is computed by repeatedly extracting the least significant digit: `m % 10`
gives the current digit, and integer division `m / 10` removes it, until
`m` reaches zero. The final answer is the parity of that sum — `0` when
the sum is odd, `1` when it is even.

The constraints bound every element by `100`, so the digit loop runs at
most three times regardless of the array size, and the arithmetic stays
exact with plain integers.

**Complexity:** `O(n)` time for the minimum scan plus `O(d)` for the
digit loop (`d <= 3` here), and `O(1)` space.
