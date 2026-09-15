# Lexicographically Smallest Permutation Greater Than Target

## Description

You are given two strings `s` and `target`, both of length n and made of
lowercase English letters.

A permutation of `s` is any rearrangement of its characters. Among every
permutation of `s` whose string value is strictly greater than `target`,
return the lexicographically smallest one. This rule pins the answer down
completely: qualifying permutations exist or they do not, and when they do,
exactly one of them is the smallest. If no permutation of `s` is
lexicographically strictly greater than `target`, return the empty string
`""`.

A string a is lexicographically strictly greater than a string b of the same
length if, at the first position where the two differ, a has a letter that
comes later in the alphabet than the corresponding letter of b. Two equal-length
strings that never differ are equal, and equality does not count as strictly
greater.

### Example 1

```text
Input: s = "abc", target = "bba"
Output: "bca"
Explanation: The permutations of s, in lexicographic order, are "abc", "acb",
"bac", "bca", "cab" and "cba". The smallest one that is strictly greater than
"bba" is "bca".
```

### Example 2

```text
Input: s = "leet", target = "code"
Output: "eelt"
Explanation: The permutations of s, in lexicographic order, are "eelt",
"eetl", "elet", "elte", "etel", "etle", "leet", "lete", "ltee", "teel",
"tele" and "tlee". Every one of them starts with a letter later than 'c', so
the smallest permutation greater than "code" is the overall smallest
permutation, "eelt".
```

### Example 3

```text
Input: s = "baba", target = "bbaa"
Output: ""
Explanation: The permutations of s, in lexicographic order, are "aabb",
"abab", "abba", "baab", "baba" and "bbaa". None of them is strictly greater
than "bbaa" itself, so the answer is "".
```

### Constraints

- `1 <= s.length == target.length <= 300`
- `s` and `target` consist of lowercase English letters.

## Hints

### Hint 1

Keep frequency counts of the letters of s that are still unused.

### Hint 2

Walk left to right; whenever the current letter of target can still be placed,
match it and continue — a longer common prefix is always better.

### Hint 3

Before matching each position, also note the smallest still-available letter
strictly greater than target[i]: that is a possible place to become greater.

### Hint 4

When no further match is possible (or target itself got fully matched), fall
back to the most recent such position: place the remembered larger letter
there, then append all remaining letters in ascending order.
