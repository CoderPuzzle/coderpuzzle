# Find the Closest Palindrome

## Description

Given a string `n` representing an integer, return the closest integer (not
including itself), which is a palindrome. If there is a tie, return the smaller
one.

The closest is defined as the absolute difference minimized between two
integers.

### Example 1

```text
Input: n = "123"
Output: "121"
```

### Example 2

```text
Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest
which is 0.
```

### Constraints

- `1 <= n.length <= 18`
- `n` consists of only digits.
- `n` does not have leading zeros.
- `n` is representing an integer in the range `[1, 10¹⁸ - 1]`.

## Hints

### Hint 1

Will brute force work for this problem? Think of something else.

### Hint 2

Take some examples like 1234, 999,1000, etc and check their closest
palindromes. How many different cases are possible?

### Hint 3

Do we have to consider only left half or right half of the string or both?

### Hint 4

Try to find the closest palindrome of these numbers- 12932, 99800, 12120. Did
you observe something?
