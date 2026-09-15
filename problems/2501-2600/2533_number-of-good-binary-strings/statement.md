# Number of Good Binary Strings

## Description

You are given four integers `minLength`, `maxLength`, `oneGroup` and
`zeroGroup`.

A binary string is good if it satisfies the following conditions:

- The length of the string is in the range `[minLength, maxLength]`.
- The size of each block of consecutive 1's is a multiple of `oneGroup`.
    - For example in a binary string 00110111100 sizes of each block of
      consecutive ones are `[2,4]`.
- The size of each block of consecutive 0's is a multiple of `zeroGroup`.
    - For example, in a binary string 00110111100 sizes of each block of
      consecutive zeros are `[2,1,2]`.

Return the number of good binary strings. Since the answer may be too large,
return it modulo 10⁹ + 7.

Note that 0 is considered a multiple of all the numbers.

### Example 1

```text
Input: minLength = 2, maxLength = 3, oneGroup = 1, zeroGroup = 2
Output: 5
Explanation: There are 5 good binary strings in this example: "00", "11",
"001", "100", and "111".
It can be proven that there are only 5 good strings satisfying all
conditions.
```

### Example 2

```text
Input: minLength = 4, maxLength = 4, oneGroup = 4, zeroGroup = 3
Output: 1
Explanation: There is only 1 good binary string in this example: "1111".
It can be proven that there is only 1 good string satisfying all conditions.
```

### Constraints

- `1 <= minLength <= maxLength <= 10⁵`
- `1 <= oneGroup, zeroGroup <= maxLength`

## Hints

### Hint 1

If we maintain DP(i, x) where i denotes the length and x denotes the last
written integer (0 or 1), then it is not hard to solve in
O(maxLength * max(zeroGroup, oneGroup)).

### Hint 2

Notice that from DP(i, 0) we only have a transition to DP(j, 1) where
`(j - i) mod oneGroup == 0` and j > i. Similarly with DP(i,1). So we can use
prefix sum to optimize our DP and solve it in O(maxLength).
