# Unique Substrings With Equal Digit Frequency

## Description

Given a digit string `s`, return the number of unique substrings of `s`
where every digit appears the same number of times.

### Example 1

```text
Input: s = "1212"
Output: 5
Explanation: The substrings that meet the requirements are "1", "2", "12",
"21", "1212".
Note that although the substring "12" appears twice, it is only counted
once.
```

### Example 2

```text
Input: s = "12321"
Output: 9
Explanation: The substrings that meet the requirements are "1", "2", "3",
"12", "23", "32", "21", "123", "321".
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of digits.

## Hints

### Hint 1

With the constraints, could we try every substring?

### Hint 2

Yes, checking every substring has runtime O(n^2), which will pass.

### Hint 3

How can we make sure we only count unique substrings?

### Hint 4

Use a set to store previously counted substrings. Hashing a string s of
length m takes O(m) time. Is there a fast way to compute the hash of s if
we know the hash of s[0..m - 2]?

### Hint 5

Use a rolling hash.
