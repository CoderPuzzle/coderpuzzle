# Count Substrings with Only One Distinct Letter

## Description

Given a string `s`, return the number of substrings that have only one
distinct letter.

### Example 1

```text
Input: s = "aaaba"
Output: 8
Explanation: The substrings with one distinct letter are "aaa", "aa", "a",
"b".
"aaa" occurs 1 time.
"aa" occurs 2 times.
"a" occurs 4 times.
"b" occurs 1 time.
So the answer is 1 + 2 + 4 + 1 = 8.
```

### Example 2

```text
Input: s = "aaaaaaaaaa"
Output: 55
```

### Constraints

- `1 <= s.length <= 1000`
- `s[i]` consists of only lowercase English letters.

## Hints

### Hint 1

What if we divide the string into substrings containing only one distinct
character with maximal lengths?

### Hint 2

Now that you have sub-strings with only one distinct character, Try to come
up with a formula that counts the number of its sub-strings.

### Hint 3

Alternatively, Observe that the constraints are small so you can use brute
force.
