# Count the Number of Consistent Strings

## Description

You are given a string `allowed` consisting of distinct characters and an
array of strings `words`. A string is called **consistent** if every
character in the string also appears in the string `allowed`.

Return the number of consistent strings in the array `words`.

### Example 1

```text
Input: allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
Output: 2
Explanation: "aaab" and "baa" are consistent, since they contain only
characters 'a' and 'b'.
```

### Example 2

```text
Input: allowed = "abc", words = ["a","b","c","ab","ac","bc","abc"]
Output: 7
Explanation: All strings are consistent.
```

### Example 3

```text
Input: allowed = "cad", words = ["cc","acd","b","ba","bac","bad","ac","d"]
Output: 4
Explanation: "cc", "acd", "ac", and "d" are consistent.
```

### Constraints

- `1 <= words.length <= 10⁴`
- `1 <= allowed.length <= 26`
- `1 <= words[i].length <= 10`
- The characters in `allowed` are distinct.
- `words[i]` and `allowed` contain only lowercase English letters.

## Hints

### Hint 1

A string is inconsistent exactly when it contains a character that is not in
`allowed`.

### Hint 2

The constraints are small enough for brute force.
