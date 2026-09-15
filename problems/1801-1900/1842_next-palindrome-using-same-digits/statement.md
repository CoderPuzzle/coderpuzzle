# Next Palindrome Using Same Digits

## Description

You are given a numeric string `num`, representing a very large palindrome.

Return the smallest palindrome larger than `num` that can be created by
rearranging its digits. If no such palindrome exists, return an empty
string `""`.

A palindrome is a number that reads the same backward as forward.

### Example 1

```text
Input: num = "1221"
Output: "2112"
Explanation: The next palindrome larger than "1221" is "2112".
```

### Example 2

```text
Input: num = "32123"
Output: ""
Explanation: No palindromes larger than "32123" can be made by rearranging the digits.
```

### Example 3

```text
Input: num = "45544554"
Output: "54455445"
Explanation: The next palindrome larger than "45544554" is "54455445".
```

### Constraints

- `1 <= num.length <= 10⁵`
- `num` is a palindrome.

## Hints

### Hint 1

Is it possible to swap one character in the first half of the palindrome to make the next one?

### Hint 2

Are there different cases for when the length is odd and even?
