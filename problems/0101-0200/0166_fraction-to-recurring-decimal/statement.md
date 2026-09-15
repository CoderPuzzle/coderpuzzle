# Fraction to Recurring Decimal

## Description

Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 10⁴ for all the given inputs.

Note that if the fraction can be represented as a finite length string, you must return it.

### Example 1

```text
Input: numerator = 1, denominator = 2
Output: "0.5"
```

### Example 2

```text
Input: numerator = 2, denominator = 1
Output: "2"
```

### Example 3

```text
Input: numerator = 4, denominator = 333
Output: "0.(012)"
```

### Constraints

- -2³¹ <= numerator, denominator <= 2³¹ - 1
- denominator != 0

## Hints

### Hint 1

No scary math, just apply elementary math knowledge. Still remember how to perform a long division?

### Hint 2

Try a long division on 4/9, the repeating part is obvious. Now try 4/333. Do you see a pattern?

### Hint 3

Notice that once the remainder starts repeating, so does the divided result.

### Hint 4

Be wary of edge cases! List out as many test cases as you can think of and test your code thoroughly.
