# Count Unique Characters of All Substrings of a Given String

## Description

Let's define a function `countUniqueChars(s)` that returns the number of
unique characters in `s`.

For example, calling `countUniqueChars("LEETCODE")` returns 5, since
`"L"`, `"T"`, `"C"`, `"O"`, `"D"` appear only once in `s`, hence they are
the unique characters.

Given a string `s`, return the sum of `countUniqueChars(t)` where `t` is a
substring of `s`. The test cases are generated such that the answer fits in a
32-bit integer.

Notice that some substrings can be repeated, so in that case you have to count
the repeated ones too.

### Example 1

```text
Input: s = "ABC"
Output: 10
Explanation: All possible substrings are: "A", "B", "C", "AB", "BC" and "ABC".
Every substring is composed of only unique letters.
The sum of lengths of all substrings is 1 + 1 + 1 + 2 + 2 + 3 = 10.
```

### Example 2

```text
Input: s = "ABA"
Output: 8
Explanation: The same as example 1, except countUniqueChars("ABA") = 1.
```

### Example 3

```text
Input: s = "LEETCODE"
Output: 92
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of uppercase English letters only.

## Hints

### Hint 1

Instead of iterating over substrings, count for each character occurrence the number of substrings in which it is the unique occurrence of that character.

### Hint 2

If s[i] has its previous equal character at p and its next equal character at q, it contributes (i - p) * (q - i) to the answer.

### Hint 3

Group the occurrence indices per letter (with sentinels -1 and n) and sum the contributions.
