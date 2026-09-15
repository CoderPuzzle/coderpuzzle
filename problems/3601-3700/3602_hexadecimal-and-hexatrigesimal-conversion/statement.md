# Hexadecimal and Hexatrigesimal Conversion

## Description

You are given an integer n.

Return the concatenation of the hexadecimal representation of n² and the
hexatrigesimal representation of n³.

A hexadecimal number is defined as a base-16 numeral system that uses the
digits 0 – 9 and the uppercase letters A - F to represent values from 0 to 15.

A hexatrigesimal number is defined as a base-36 numeral system that uses the
digits 0 – 9 and the uppercase letters A - Z to represent values from 0 to 35.

### Example 1

```text
Input: n = 13
Output: "A91P1"
Explanation: n² = 13 * 13 = 169. In hexadecimal, it converts to
(10 * 16) + 9 = 169, which corresponds to "A9".
n³ = 13 * 13 * 13 = 2197. In hexatrigesimal, it converts to
(1 * 36²) + (25 * 36) + 1 = 2197, which corresponds to "1P1".
Concatenating both results gives "A9" + "1P1" = "A91P1".
```

### Example 2

```text
Input: n = 36
Output: "5101000"
Explanation: n² = 36 * 36 = 1296. In hexadecimal, it converts to
(5 * 16²) + (1 * 16) + 0 = 1296, which corresponds to "510".
n³ = 36 * 36 * 36 = 46656. In hexatrigesimal, it converts to
(1 * 36³) + (0 * 36²) + (0 * 36) + 0 = 46656, which corresponds to "1000".
Concatenating both results gives "510" + "1000" = "5101000".
```

### Constraints

- `1 <= n <= 1000`

## Hints

### Hint 1

Implement a function toBase(x, b) that converts integer x into a string in base b, using digits 0–9 and letters A-Z as needed.

### Hint 2

Simulate as described
