# Maximum Number That Makes Result of Bitwise AND Zero

## Description

Given an integer n, return the maximum integer x such that x <= n, and the
bitwise AND of all the numbers in the range [x, n] is 0.

### Example 1

```text
Input: n = 7
Output: 3
Explanation:
The bitwise AND of [6, 7] is 6.
The bitwise AND of [5, 6, 7] is 4.
The bitwise AND of [4, 5, 6, 7] is 4.
The bitwise AND of [3, 4, 5, 6, 7] is 0.
```

### Example 2

```text
Input: n = 9
Output: 7
Explanation:
The bitwise AND of [7, 8, 9] is 0.
```

### Example 3

```text
Input: n = 17
Output: 15
Explanation:
The bitwise AND of [15, 16, 17] is 0.
```

### Constraints

- `1 <= n <= 10¹⁵`

## Hints

### Hint 1

Examine the set bits of n.

### Hint 2

When performing bitwise AND operations sequentially down from n, the last
set bit to turn to 0 identifies the highest set bit.

### Hint 3

If the index of the highest set bit is x, the answer is 2ˣ - 1.
