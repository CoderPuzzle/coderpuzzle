# Reverse String

## Description

Write a function that reverses a string. The input string is given as an
array of characters `s`.

You must do this by modifying the input array in-place with `O(1)` extra
memory.

On LeetCode the function reverses `s` in place and returns nothing; here
the judge observes only the return value, so reverse `s` in place and
return the reversed array.

### Example 1

```text
Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

### Example 2

```text
Input: s = ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is a printable ascii character.

## Hints

### Hint 1

The entire logic for reversing a string is based on using the opposite
directional two-pointer approach!
