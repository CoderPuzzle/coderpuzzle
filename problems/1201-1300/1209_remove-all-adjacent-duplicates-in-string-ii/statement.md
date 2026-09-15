# Remove All Adjacent Duplicates in String II

## Description

You are given a string `s` and an integer `k`. A `k` duplicate removal
consists of choosing `k` adjacent and equal letters from `s` and removing
them, causing the left and the right side of the deleted substring to
concatenate together.

We repeatedly make `k` duplicate removals on `s` until we no longer can.

Return the final string after all such duplicate removals have been made. It
is guaranteed that the answer is unique.

### Example 1

```text
Input: s = "abcd", k = 2
Output: "abcd"
Explanation: There's nothing to delete.
```

### Example 2

```text
Input: s = "deeedbbcccbdaa", k = 3
Output: "aa"
Explanation:
First delete "eee" and "ccc", get "ddbbbdaa"
Then delete "bbb", get "dddaa"
Finally delete "ddd", get "aa"
```

### Example 3

```text
Input: s = "pbbcggttciiippooaais", k = 2
Output: "ps"
```

### Constraints

- `1 <= s.length <= 10^5`
- `2 <= k <= 10^4`
- `s` only contains lowercase English letters.

## Hints

### Hint 1

Use a stack to store the characters; whenever the top k characters are equal, delete them.

### Hint 2

To make it more efficient, store (character, count) pairs on the stack instead of scanning the top k each time.

### Hint 3

When a run reaches count k, pop it — the characters before it may then become adjacent and merge in the next step.
