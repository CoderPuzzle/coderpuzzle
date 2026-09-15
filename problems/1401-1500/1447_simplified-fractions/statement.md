# Simplified Fractions

## Description

Given an integer `n`, return a list of all simplified fractions between 0
and 1 (exclusive) such that the denominator is less-than-or-equal-to `n`.
You can return the answer in any order.

For a deterministic answer, the expected output lists the fractions with
the numerator in the outer loop and the denominator in the inner one —
exactly the order the examples show.

### Example 1

```text
Input: n = 2
Output: ["1/2"]
Explanation: "1/2" is the only unique fraction with a denominator
less-than-or-equal-to 2.
```

### Example 2

```text
Input: n = 3
Output: ["1/2","1/3","2/3"]
```

### Example 3

```text
Input: n = 4
Output: ["1/2","1/3","1/4","2/3","3/4"]
Explanation: "2/4" is not a simplified fraction because it can be
simplified to "1/2".
```

### Constraints

- `1 <= n <= 100`

## Hints

### Hint 1

A fraction is fully simplified if there is no integer that divides
cleanly into the numerator and denominator.

### Hint 2

In other words the greatest common divisor of the numerator and the
denominator of a simplified fraction is 1.
