# Split a String in Balanced Strings

## Description

Balanced strings are those that have an equal quantity of `'L'` and `'R'`
characters.

Given a balanced string `s`, split it into some number of substrings such
that:

- Each substring is balanced.

Return the maximum number of balanced strings you can obtain.

### Example 1

```text
Input: s = "RLRRLLRLRL"
Output: 4
Explanation: s can be split into "RL", "RRLL", "RL", "RL", each substring contains same number of 'L' and 'R'.
```

### Example 2

```text
Input: s = "RLRRRLLRLL"
Output: 2
Explanation: s can be split into "RL", "RRRLLRLL", each substring contains same number of 'L' and 'R'.
Note that s cannot be split into "RL", "RR", "RL", "LR", "LL", because the 2nd and 5th substrings are not balanced.
```

### Example 3

```text
Input: s = "LLLLRRRR"
Output: 1
Explanation: s can be split into "LLLLRRRR".
```

### Constraints

- `2 <= s.length <= 1000`
- `s[i]` is either `'L'` or `'R'`.
- `s` is a balanced string.

## Hints

### Hint 1

Loop from left to right maintaining a balance variable when it gets an `L`
increase it by one otherwise decrease it by one.

### Hint 2

Whenever the balance variable reaches zero then we increase the answer by one.
