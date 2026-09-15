# Phone Number Prefix

## Description

You are given a string array `numbers` that represents phone numbers.
Return `true` if no phone number is a prefix of any other phone number;
otherwise, return `false`.

### Example 1

```text
Input: numbers = ["1","2","4","3"]
Output: true
Explanation: No number is a prefix of another, so the output is true.
```

### Example 2

```text
Input: numbers = ["001","007","15","00153"]
Output: false
Explanation: The string "001" is a prefix of the string "00153". Thus,
the output is false.
```

### Constraints

- `2 <= numbers.length <= 50`
- `1 <= numbers[i].length <= 50`
- All numbers contain only digits '0' to '9'.

## Hints

### Hint 1

Sort the array.

### Hint 2

For every adjacent pair, check if the left number is a prefix of the
right number.
