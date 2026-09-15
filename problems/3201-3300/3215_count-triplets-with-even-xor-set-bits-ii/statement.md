# Count Triplets with Even XOR Set Bits II

## Description

Given three integer arrays `a`, `b`, and `c`, return the number of triplets
`(a[i], b[j], c[k])` such that the bitwise XOR of the triplet has an even
number of set bits.

The three index ranges are independent: every combination of one element
from each array counts as its own triplet, and indexes may repeat values.

### Example 1

```text
Input: a = [1], b = [2], c = [3]
Output: 1
Explanation: The only triplet is (a[0], b[0], c[0]) and their XOR is
1 ^ 2 ^ 3 = 0, whose binary representation has no set bits at all.
```

### Example 2

```text
Input: a = [1,1], b = [2,3], c = [1,5]
Output: 4
Explanation: The four qualifying triplets are:
(a[0], b[1], c[0]): 1 ^ 3 ^ 1 = 3
(a[1], b[1], c[0]): 1 ^ 3 ^ 1 = 3
(a[0], b[0], c[1]): 1 ^ 2 ^ 5 = 6
(a[1], b[0], c[1]): 1 ^ 2 ^ 5 = 6
Each of the XORs 3 and 6 carries exactly two set bits.
```

### Constraints

- `1 <= a.length, b.length, c.length <= 10⁵`
- `0 <= a[i], b[i], c[i] <= 10⁹`

## Hints

### Hint 1

If x and y both have an even number of set bits, how many set bits do their
XOR have?

### Hint 2

If exactly one of x and y has an even number of set bits, how many set bits
do their XOR have?

### Hint 3

Conclude that if the XOR of three elements would have an even number of set
bits, an even number of them (0 or 2) should have an odd number of set bits!

### Hint 4

For each array count the number of elements that have even set bits and also
count the ones that have odd set bits.
