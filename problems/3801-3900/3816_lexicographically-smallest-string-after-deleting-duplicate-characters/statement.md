# Lexicographically Smallest String After Deleting Duplicate Characters

## Description

You are given a string s that consists of lowercase English letters.

You can perform the following operation any number of times (possibly zero
times):

- Choose any letter that appears at least twice in the current string s and
  delete any one occurrence.

Return the lexicographically smallest resulting string that can be formed
this way.

### Example 1

```text
Input: s = "aaccb"
Output: "aacb"
Explanation: We can form the strings "acb", "aacb", "accb", and "aaccb".
"aacb" is the lexicographically smallest one.

For example, we can obtain "aacb" by choosing 'c' and deleting its first
occurrence.
```

### Example 2

```text
Input: s = "z"
Output: "z"
Explanation: We cannot perform any operations. The only string we can form
is "z".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` contains lowercase English letters only.

## Hints

### Hint 1

Solve greedily.

### Hint 2

Each distinct letter must appear at least once in the final string.

### Hint 3

For each letter, maintain a deque of its positions.

### Hint 4

At each step, try letters from 'a' to 'z' and pick the smallest letter whose
earliest position lies within a safe window.

### Hint 5

Do not pick an occurrence if choosing it would make some other letter
impossible to keep.

### Hint 6

Mark positions as used and repeat, always minimizing the next chosen
character.
