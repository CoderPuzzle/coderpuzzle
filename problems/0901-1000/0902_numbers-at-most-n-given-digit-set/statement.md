# Numbers At Most N Given Digit Set

## Description

You are given an array of digit strings `digits`, sorted in
non-decreasing order, and an integer `n`. A positive integer is
writable when every digit of its decimal spelling is an element of
`digits`, and each element may be reused as many times as you like.
For example, if `digits = ["1","3","5"]`, the numbers 13, 551, and
1351315 are all writable.

Return the number of writable positive integers less than or equal to
`n`.

### Example 1

```text
Input: digits = ["1","3","5","7"], n = 100
Output: 20
Explanation: The 20 writable numbers are 1, 3, 5, 7, 11, 13, 15, 17, 31, 33,
35, 37, 51, 53, 55, 57, 71, 73, 75, and 77.
```

### Example 2

```text
Input: digits = ["1","4","9"], n = 1000000000
Output: 29523
Explanation: We can write 3 one digit numbers, 9 two digit numbers, 27 three
digit numbers, 81 four digit numbers, 243 five digit numbers, 729 six digit
numbers, 2187 seven digit numbers, 6561 eight digit numbers, and 19683 nine
digit numbers. In total, this is 29523 writable integers.
```

### Example 3

```text
Input: digits = ["7"], n = 8
Output: 1
```

### Constraints

- `1 <= digits.length <= 9`
- `digits[i].length == 1`
- `digits[i]` is a digit from `'1'` to `'9'`.
- All the values in `digits` are unique.
- `digits` is sorted in non-decreasing order.
- `1 <= n <= 10⁹`
