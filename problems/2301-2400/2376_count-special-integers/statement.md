# Count Special Integers

## Description

We call a positive integer **special** if all of its digits are distinct.

Given a positive integer `n`, return the number of special integers that
belong to the interval `[1, n]`.

### Example 1

```text
Input: n = 20
Output: 19
Explanation: All the integers from 1 to 20, except 11, are special. Thus, there are 19 special integers.
```

### Example 2

```text
Input: n = 5
Output: 5
Explanation: All the integers from 1 to 5 are special.
```

### Example 3

```text
Input: n = 135
Output: 110
Explanation: There are 110 integers from 1 to 135 that are special.
Some of the integers that are not special are: 22, 114, and 131.
```

### Constraints

- `1 <= n <= 2 * 10^9`

## Hints

### Hint 1

Try to think of dynamic programming.

### Hint 2

Use digit dynamic programming to build the numbers, along with a bitmask that tells which digits have been used so far in the number being built.
