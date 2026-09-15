# Number of Ways to Separate Numbers

## Description

Given a string `num` that contains only digits, you wrote down many positive
integers but forgot to add commas to separate the different numbers. You
remember that the list of integers was **non-decreasing** and that no integer
had **leading zeros**.

Return the number of possible lists of integers that you could have written
down to get the string `num`. Since the answer may be large, return it modulo
`10⁹ + 7`.

### Example 1

```text
Input: num = "327"
Output: 2
Explanation: You could have written down the numbers:
3, 27
327
```

### Example 2

```text
Input: num = "094"
Output: 0
Explanation: No numbers can have leading zeros and all numbers must be positive.
```

### Example 3

```text
Input: num = "0"
Output: 0
Explanation: No numbers can have leading zeros and all numbers must be positive.
```

### Constraints

- `1 <= num.length <= 3500`
- `num` consists of digits `'0'` through `'9'`.

## Hints

### Hint 1

If we know the current number has d digits, how many digits can the previous number have?

### Hint 2

Is there a quick way of calculating the number of possibilities for the previous number if we know that it must have less than or equal to d digits? Try to do some pre-processing.
