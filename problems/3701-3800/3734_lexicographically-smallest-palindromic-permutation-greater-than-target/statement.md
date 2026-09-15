# Lexicographically Smallest Palindromic Permutation Greater Than Target

## Description

You are given two strings `s` and `target`, both of length n and made of
lowercase English letters.

A palindromic permutation of `s` is a rearrangement of its characters that
reads the same forwards and backwards. Among every palindromic permutation
of `s` whose string value is strictly greater than `target`, return the
lexicographically smallest one. This rule pins the answer down completely:
qualifying strings exist or they do not, and when they do, exactly one of
them is the smallest. If no palindromic permutation of `s` is
lexicographically strictly greater than `target`, return the empty string
`""`.

A string a is lexicographically strictly greater than a string b of the same
length if, at the first position where the two differ, a has a letter that
comes later in the alphabet than the corresponding letter of b. Two
equal-length strings that never differ are equal, and equality does not
count as strictly greater.

### Example 1

```text
Input: s = "baba", target = "abba"
Output: "baab"
Explanation: The palindromic permutations of s, in lexicographic order, are
"abba" and "baab". The smallest one that is strictly greater than "abba" is
"baab".
```

### Example 2

```text
Input: s = "baba", target = "bbaa"
Output: ""
Explanation: The palindromic permutations of s, in lexicographic order, are
"abba" and "baab". Neither is strictly greater than "bbaa", so the answer
is "".
```

### Example 3

```text
Input: s = "abc", target = "abb"
Output: ""
Explanation: No rearrangement of s reads the same forwards and backwards,
so no palindromic permutation exists and the answer is "".
```

### Example 4

```text
Input: s = "aac", target = "abb"
Output: "aca"
Explanation: The only palindromic permutation of s is "aca". It is strictly
greater than "abb", so the answer is "aca".
```

### Constraints

- `1 <= n == s.length == target.length <= 300`
- `s` and `target` consist of lowercase English letters.

## Hints

### Hint 1

A palindromic permutation exists only if at most one character has an odd
count (for odd-length strings) or all counts are even (for even-length
strings).

### Hint 2

Focus on constructing the first half of the palindrome. The second half is
determined by mirroring.

### Hint 3

To be lexicographically greater than target, the first half must be greater
than or equal to target's first half, with careful handling of the middle
character for odd-length strings.

### Hint 4

Use a backtracking approach or greedy selection for each position in the
first half, trying the smallest available character that can still produce
a valid palindrome.

### Hint 5

After building the first half, mirror it (and add the middle character if
needed) to form the full palindrome and verify it is strictly greater than
target.
