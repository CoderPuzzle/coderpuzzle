# Sum of Number and Its Reverse

## Description

Given a non-negative integer `num`, return `true` if `num` can be expressed
as the sum of any non-negative integer and its reverse, or `false`
otherwise.

### Example 1

```text
Input: num = 443
Output: true
Explanation: 172 + 271 = 443 so we return true.
```

### Example 2

```text
Input: num = 63
Output: false
Explanation: 63 cannot be expressed as the sum of a non-negative integer and its reverse so we return false.
```

### Example 3

```text
Input: num = 181
Output: true
Explanation: 140 + 041 = 181 so we return true. Note that when a number is reversed, there may be leading zeros.
```

### Constraints

- `0 <= num <= 10⁵`

## Hints

### Hint 1

The constraints are small enough that we can check every number.

### Hint 2

To reverse a number, first convert it to a string. Then, create a new string that is the reverse of the first one. Finally, convert the new string back into a number.
