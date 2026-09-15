# The Score of Students Solving Math Expression

## Description

You are given a string `s` that contains digits `0-9`, addition symbols `+`,
and multiplication symbols `*` only, representing a valid mathematical
expression of single-digit numbers (for example, `3+5*2`). This expression was
given to `n` elementary school students. The students were instructed to get
the answer by following this order of operations:

- Compute multiplication, reading from left to right; then
- Compute addition, reading from left to right.

You are given an integer array `answers` of length `n`, containing the students'
submitted answers in no particular order. Grade each answer by these rules:

- If an answer equals the correct value of the expression, award 5 points.
- Otherwise, if the answer could result from applying the operators in the
  wrong order while using correct arithmetic, award 2 points.
- Otherwise, award 0 points.

Return the sum of the students' points.

### Example 1

![diagram](figures/2019-1.svg)

```text
Input: s = "7+3*1*2", answers = [20,13,42]
Output: 7
Explanation: The correct value is 13, so that answer earns 5 points.
The wrong order ((7+3)*1)*2 produces 20, so that answer earns 2 points.
The scores are [2,5,0], whose sum is 7.
```

### Example 2

```text
Input: s = "3+5*2", answers = [13,0,10,13,13,16,16]
Output: 19
Explanation: The correct value is 13, so its three occurrences earn 5 points each.
The wrong order (3+5)*2 produces 16, so its two occurrences earn 2 points each.
The scores are [5,0,0,5,5,2,2], whose sum is 19.
```

### Example 3

```text
Input: s = "6+0*1", answers = [12,9,6,4,8,6]
Output: 10
Explanation: The correct value is 6. The wrong order (6+0)*1 also produces 6,
but a correct answer earns 5 points rather than 2. The scores are
[0,0,5,0,0,5], whose sum is 10.
```

### Constraints

- `3 <= s.length <= 31`
- `s` represents a valid expression containing only digits `0-9`, `+`, and `*`.
- Every integer operand is in the inclusive range `[0, 9]`.
- The expression contains between `1` and `15` operators, inclusive.
- The correct value of the expression is in the inclusive range `[0, 1000]`.
- Values never exceed `10⁹` in intermediate multiplication steps.
- `n == answers.length`
- `1 <= n <= 10⁴`
- `0 <= answers[i] <= 1000`

## Hints

### Hint 1

The number of operators in the equation is less. Could you find the right
answer then generate all possible answers using different orders of operations?

### Hint 2

Divide the equation into blocks separated by the operators, and use memoization
on the results of blocks for optimization.

### Hint 3

Use set and the max limit of the answer for further optimization.
