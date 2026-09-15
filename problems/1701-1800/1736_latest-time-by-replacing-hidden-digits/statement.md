# Latest Time by Replacing Hidden Digits

## Description

You are given a string `time` in the form of `hh:mm`, where some of the
digits in the string are hidden (represented by `?`).

The valid times are those inclusively between `00:00` and `23:59`.

Return the latest valid time you can get from `time` by replacing the hidden
digits.

### Example 1

```text
Input: time = "2?:?0"
Output: "23:50"
Explanation: The latest hour beginning with the digit '2' is 23 and the
latest minute ending with the digit '0' is 50.
```

### Example 2

```text
Input: time = "0?:3?"
Output: "09:39"
```

### Example 3

```text
Input: time = "1?:22"
Output: "19:22"
```

### Constraints

- `time` is in the format `hh:mm`.
- It is guaranteed that you can produce a valid time from the given string.

## Hints

### Hint 1

Trying out all possible solutions from biggest to smallest would fit in the
time limit.

### Hint 2

To check if the solution is okay, you need to find out if it's valid and
matches every character
