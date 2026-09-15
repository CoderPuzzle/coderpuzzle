# Count the Digits That Divide a Number

## Description

Given an integer num, return the number of digits in num that divide num.

An integer val divides nums if nums % val == 0.

### Example 1

```text
Input: num = 7
Output: 1
Explanation: 7 divides itself, hence the answer is 1.
```

### Example 2

```text
Input: num = 121
Output: 2
Explanation: 121 is divisible by 1, but not 2. Since 1 occurs twice as a digit, we return 2.
```

### Example 3

```text
Input: num = 1248
Output: 4
Explanation: 1248 is divisible by all of its digits, hence the answer is 4.
```

### Constraints

- `1 <= num <= 10⁹`
- num does not contain 0 as one of its digits.

## Hints

### Hint 1

Use mod by 10 to retrieve the least significant digit of the number

### Hint 2

Divide the number by 10, then round it down so that the second least
significant digit becomes the least significant digit of the number

### Hint 3

Use your language’s mod operator to see if a number is a divisor of
another.
