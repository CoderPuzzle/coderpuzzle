# Happy Number

## Description

Write an algorithm to determine if a number `n` is happy.

A happy number is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the
  squares of its digits.
- Repeat the process until the number equals `1` (where it will stay), or it
  loops endlessly in a cycle which does not include `1`.
- Those numbers for which the process ends in `1` are happy.

Return `true` if `n` is a happy number, and `false` if not.

### Example 1

```text
Input: n = 19
Output: true
Explanation:
1² + 9² = 82
8² + 2² = 68
6² + 8² = 100
1² + 0² + 0² = 1
```

### Example 2

```text
Input: n = 2
Output: false
```

### Constraints

- `1 <= n <= 2³¹ - 1`

## Hints

### Hint 1

Repeatedly replace n with the sum of the squares of its digits; the question is whether you reach 1 or fall into a cycle.

### Hint 2

Keep a set of values already seen — revisiting one means you are in a cycle that never reaches 1.

### Hint 3

Floyd's tortoise-and-hare cycle detection over the digit-square sequence works too and uses O(1) space.
