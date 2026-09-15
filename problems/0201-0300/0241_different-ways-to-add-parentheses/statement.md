# Different Ways to Add Parentheses

## Description

Given a string `expression` of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators.

For a deterministic answer, return the values in ascending order, keeping duplicates: every grouping that evaluates to the same value contributes its own entry to the list.

The test cases are generated such that the output values fit in a 32-bit integer and the number of different results does not exceed `10⁴`.

### Example 1

```text
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0
(2-(1-1)) = 2
```

### Example 2

```text
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
```

### Constraints

- `1 <= expression.length <= 20`
- `expression` consists of digits and the operator `'+'`, `'-'`, and `'*'`.
- All the integer values in the input expression are in the range `[0, 99]`.
- The integer values in the input expression do not have a leading `'-'` or `'+'` denoting the sign.
