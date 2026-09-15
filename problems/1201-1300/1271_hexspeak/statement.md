# Hexspeak

## Description

A decimal number can be converted to its Hexspeak representation by first
converting it to an uppercase hexadecimal string, then replacing all
occurrences of the digit `'0'` with the letter `'O'`, and the digit `'1'`
with the letter `'I'`. Such a representation is valid if and only if it
consists only of the letters in the set `{'A', 'B', 'C', 'D', 'E', 'F',
'I', 'O'}`.

Given a string `num` representing a decimal integer `n`, return the
Hexspeak representation of `n` if it is valid, otherwise return
`"ERROR"`.

### Example 1

```text
Input: num = "257"
Output: "IOI"
Explanation: 257 is 101 in hexadecimal.
```

### Example 2

```text
Input: num = "3"
Output: "ERROR"
```

### Constraints

- `1 <= num.length <= 12`
- `num` does not contain leading zeros.
- `num` represents an integer in the range `[1, 10^12]`.

## Hints

### Hint 1

Convert the given number to hexadecimal.

### Hint 2

Replace all 0 and 1 with 'O' and 'I'.

### Hint 3

Check if the final string has any numerical digits.
