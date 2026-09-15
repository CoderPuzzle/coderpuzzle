# Binary Gap

## Description

Given a positive integer `n`, return the longest distance between any two
adjacent 1's in the binary representation of `n`. If there are no two
adjacent 1's, return `0`.

Two 1's are adjacent if there are only 0's separating them (possibly no
0's at all). The distance between two 1's is the absolute difference between
their bit positions. For example, the two 1's in `1001` have a distance of
`3`.

### Example 1

```text
Input: n = 22
Output: 2
Explanation: 22 in binary is 10110. The 1's form two adjacent pairs with
distances of 2 and 1, so the answer is 2. The outermost two 1's do not form
an adjacent pair, because another 1 sits between them.
```

### Example 2

```text
Input: n = 8
Output: 0
Explanation: 8 in binary is 1000. There is only one 1, so there is no pair
of adjacent 1's and the answer is 0.
```

### Example 3

```text
Input: n = 5
Output: 2
Explanation: 5 in binary is 101, and the two 1's are at distance 2.
```

### Constraints

- `1 <= n <= 10⁹`
