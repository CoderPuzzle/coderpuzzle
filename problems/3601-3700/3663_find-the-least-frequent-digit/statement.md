# Find The Least Frequent Digit

## Description

You are given a positive integer `n`. Return the digit that occurs least
frequently in its decimal representation, as an integer.

The frequency of a digit is the number of times it appears in the decimal
representation of `n`; only digits that actually appear are candidates.
If multiple digits share the lowest frequency, return the smallest of
those digits.

### Example 1

```text
Input: n = 1553322
Output: 1
Explanation: The digit 1 appears once, while 5, 3, and 2 each appear
twice, so the least frequent digit is 1.
```

### Example 2

```text
Input: n = 723344511
Output: 2
Explanation: The digits 7, 2, and 5 each appear once — the lowest
frequency — and the smallest of them is 2.
```

### Constraints

- `1 <= n <= 2³¹ - 1`

## Hints

### Hint 1

Simulate as described.
