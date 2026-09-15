# Numbers With Repeated Digits

## Description

Given an integer `n`, return the number of positive integers in the range
`[1, n]` that have **at least one repeated digit**.

### Example 1

```text
Input: n = 20
Output: 1
Explanation: The only positive number (<= 20) with at least 1 repeated digit is 11.
```

### Example 2

```text
Input: n = 100
Output: 10
Explanation: The positive numbers (<= 100) with at least 1 repeated digit are 11, 22, 33, 44, 55, 66, 77, 88, 99, and 100.
```

### Example 3

```text
Input: n = 1000
Output: 262
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

How many numbers with no duplicate digits? How many numbers with K digits and no duplicates?

### Hint 2

How many numbers with the same length as N have no duplicates, and how many share the same prefix as N?
