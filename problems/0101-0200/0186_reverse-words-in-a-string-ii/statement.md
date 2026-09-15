# Reverse Words in a String II

## Description

Given a character array `s`, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in `s` will be
separated by a single space.

Your code must solve the problem **in-place**, i.e. without allocating extra space.

On LeetCode the function returns nothing and the judge inspects the mutated array; here
the judge observes only the return value, so reverse the words in place within the string
and return it — the returned string is the mutated array, joined.

### Example 1

```text
Input: s = "the sky is blue"
Output: "blue is sky the"
```

### Example 2

```text
Input: s = "a"
Output: "a"
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is an English letter (uppercase or lowercase), digit, or space `' '`.
- There is at least one word in `s`.
- `s` does not contain leading or trailing spaces.
- All the words in `s` are guaranteed to be separated by a single space.
